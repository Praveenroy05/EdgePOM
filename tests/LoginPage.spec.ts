// tests/LoginPage.spec.ts
// spec: test-plans/practice-test-login-plan.md

import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_object/LoginPage';
import { DashboardPage } from '../page_object/DashboardPage';

test.describe('Practice Test Login', () => {
  test('Positive LogIn test', async ({ page }) => {
    const login = new LoginPage(page);
    const dash = new DashboardPage(page);

    // 1. Open the login page.
    await login.goto();

    // 2. Type username `student` into the Username field.
    await login.fillUsername('student');

    // 3. Type password `Password123` into the Password field.
    await login.fillPassword('Password123');

    // 4. Click the `Submit` button.
    await login.submit();

    // Expected: navigates to /logged-in-successfully/ and shows success text and Log out.
    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  });

  test('Negative username test', async ({ page }) => {
    const login = new LoginPage(page);

    // 1. Open the login page.
    await login.goto();

    // 2. Type username `incorrectUser` into the Username field.
    await login.fillUsername('incorrectUser');

    // 3. Type password `Password123` into the Password field.
    await login.fillPassword('Password123');

    // 4. Click the `Submit` button.
    await login.submit();

    // Expected: remain on login page and show exact error text.
    await expect(page).toHaveURL(/practice-test-login/);
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('Negative password test', async ({ page }) => {
    const login = new LoginPage(page);

    // 1. Open the login page.
    await login.goto();

    // 2. Type username `student` into the Username field.
    await login.fillUsername('student');

    // 3. Type password `incorrectPassword` into the Password field.
    await login.fillPassword('incorrectPassword');

    // 4. Click the `Submit` button.
    await login.submit();

    // Expected: remain on login page and show exact error text.
    await expect(page).toHaveURL(/practice-test-login/);
    await expect(page.getByText('Your password is invalid!')).toBeVisible();
  });

  test('Empty Credentials', async ({ page }) => {
    const login = new LoginPage(page);

    // 1. Open the login page.
    await login.goto();

    // 2. Leave Username and Password empty.
    await login.fillUsername('');
    await login.fillPassword('');

    // 3. Click the `Submit` button.
    await login.submit();

    // Expected: username error displayed.
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('Whitespace credentials', async ({ page }) => {
    const login = new LoginPage(page);

    // 1. Open the login page.
    await login.goto();

    // 2. Enter whitespace-only values.
    await login.fillUsername('   ');
    await login.fillPassword('   ');

    // 3. Click Submit.
    await login.submit();

    // Expected: treated as invalid and error shown.
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('Long username/password (256 chars)', async ({ page }) => {
    const login = new LoginPage(page);
    const long = 'a'.repeat(256);

    // 1. Open the login page.
    await login.goto();

    // 2. Enter long credentials.
    await login.fillUsername(long);
    await login.fillPassword(long);

    // 3. Click Submit.
    await login.submit();

    // Expected: page handles input and shows an error (no crash).
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('Special chars and injection', async ({ page }) => {
    const login = new LoginPage(page);
    const payload = "'; DROP TABLE users; --";

    // 1. Open the login page.
    await login.goto();

    // 2. Enter payload.
    await login.fillUsername(payload);
    await login.fillPassword(payload);

    // 3. Click Submit.
    await login.submit();

    // Expected: input treated as invalid and error shown.
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('Accessibility and keyboard navigation', async ({ page }) => {
    const login = new LoginPage(page);

    // 1. Open the login page.
    await login.goto();

    // 2. Verify Username field is reachable with Tab and Submit can be activated with Enter.
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await page.keyboard.press('Tab'); // move focus
    await page.keyboard.press('Tab'); // move focus to Submit
    // Press Enter to activate Submit while focused.
    await page.keyboard.press('Enter');

    // Expected: if inputs empty, username error appears.
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });

  test('Error message lifecycle', async ({ page }) => {
    const login = new LoginPage(page);

    // 1. Open the login page.
    await login.goto();

    // 2. Trigger an error (invalid username).
    await login.fillUsername('incorrectUser');
    await login.fillPassword('Password123');
    await login.submit();
    await expect(page.getByText('Your username is invalid!')).toBeVisible();

    // 3. Correct the username and submit with correct password.
    await login.fillUsername('student');
    await login.fillPassword('Password123');
    await login.submit();

    // Expected: error disappears and success page is reached.
    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();
  });

  test('Visual/Responsive checks (basic)', async ({ page }) => {
    const login = new LoginPage(page);

    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await login.goto();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

    // Mobile-ish
    await page.setViewportSize({ width: 375, height: 812 });
    await login.goto();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });
});
