# Practice Test Login — Comprehensive Test Plan

## Executive summary

This document contains a comprehensive test plan for the Test Login page at https://practicetestautomation.com/practice-test-login/. The page is simple: it provides a username and password input, a Submit button, and displays success or error messages. The plan covers primary user journeys (login success and failures), negative and edge cases, UI/UX and accessibility checks, and a small automation checklist.

Assumptions
- Tests start from a blank/fresh browser state (no cached authentication).
- The target environment is the public site at https://practicetestautomation.com/practice-test-login/.
- Known valid credentials (from the page): username `student`, password `Password123`.
- The page is static and does not require an account creation flow.

Quality gates
- Each scenario contains clear steps, expected outcomes, and pass/fail criteria.
- Scenarios are independent and can be executed in any order.

## Application overview

Key functionality:
- Username input
- Password input
- Submit button
- Error message area for invalid username/password
- Successful login redirects to a success page with a "Log out" button

Success URL: practicetestautomation.com/logged-in-successfully/

## Element map (recommended selectors)
- Username input: role=textbox with accessible name "Username" (example selector: `getByRole('textbox', { name: 'Username' })`)
- Password input: role=textbox with accessible name "Password" (example selector: `getByRole('textbox', { name: 'Password' })`)
- Submit button: role=button name "Submit" (example selector: `getByRole('button', { name: 'Submit' })`)
- Error messages: visible text nodes such as "Your username is invalid!" or "Your password is invalid!" (example selector: `getByText('Your username is invalid!')`)
- Success page: look for URL containing `/logged-in-successfully/` and content like "Congratulations" and a "Log out" button.

## Primary user journeys (critical paths)
1. Happy path: successful login with valid credentials.
2. Negative path: invalid username.
3. Negative path: invalid password.
4. Negative path: empty credentials.
5. Regression: UI elements present and accessible.

## Test data
- Valid: { username: `student`, password: `Password123` }
- Invalid username: `incorrectUser`
- Invalid password: `incorrectPassword`
- Long/edge strings: 256-character username/password, strings with special chars, whitespace-only

## Test environment & prerequisites
- Browser: Chrome/Chromium (latest), Firefox (latest), Edge (Chromium) — manual and automated checks
- Network: Internet connectivity to the public site
- Account: no account setup required
- Starting state: clear cookies/storage or use a new incognito/private window for each scenario

## Success criteria
- Happy path: user reaches success URL and sees expected success content and "Log out" button.
- Negative paths: appropriate error message displayed and user remains on the login page.
- Accessibility: inputs and controls reachable by keyboard, ARIA/roles present, visible focus styles.

---

## Test scenarios

Each scenario assumes: a cleared browser state and navigation to the page URL: `https://practicetestautomation.com/practice-test-login/`.

### Scenario 1: Successful login (Happy path)

Title: Positive LogIn test
Assumptions: Fresh session, site reachable.

Steps:
1. Open the login page.
2. Type username `student` into the Username field.
3. Type password `Password123` into the Password field.
4. Click the `Submit` button.

Expected results:
- The page navigates to a URL containing `/logged-in-successfully/`.
- Page contains confirmation text (e.g., "Congratulations", or text indicating successful login).
- A `Log out` button is displayed and clickable.

Success criteria:
- All expected results are observed.

Failure conditions:
- Redirect does not happen, or confirmation content missing, or `Log out` missing.

### Scenario 2: Invalid username (Negative username test)

Title: Negative username test
Assumptions: Fresh session.

Steps:
1. Open the login page.
2. Type username `incorrectUser` into the Username field.
3. Type password `Password123` into the Password field.
4. Click the `Submit` button.

Expected results:
- Remain on the login page (no redirect to success URL).
- An error message appears with text exactly: "Your username is invalid!".
- Username and password fields remain visible and editable.

Success criteria:
- Error message text matches expected string and is visible.

Failure conditions:
- No error message, or incorrect text, or unexpected redirect.

### Scenario 3: Invalid password (Negative password test)

Title: Negative password test
Assumptions: Fresh session.

Steps:
1. Open the login page.
2. Type username `student` into the Username field.
3. Type password `incorrectPassword` into the Password field.
4. Click the `Submit` button.

Expected results:
- Remain on the login page.
- An error message appears with text exactly: "Your password is invalid!".

Success criteria:
- Error message with expected text is visible.

Failure conditions:
- No error message, incorrect text, or unexpected redirect.

### Scenario 4: Empty credentials

Title: Empty Credentials
Assumptions: Fresh session.

Steps:
1. Open the login page.
2. Leave Username and Password empty.
3. Click the `Submit` button.

Expected results:
- Error message "Your username is invalid!" is displayed (page behavior shows username validation first).
- Remain on the login page.

Success criteria:
- The expected username error appears.

Failure conditions:
- No error message or unexpected redirect.

### Scenario 5: Whitespace-only input

Title: Whitespace credentials
Assumptions: Fresh session.

Steps:
1. Open the login page.
2. Enter a string of spaces (e.g., `   `) into Username and Password.
3. Click `Submit`.

Expected results:
- Treated as invalid input. Either a username error is shown ("Your username is invalid!") or a generic invalid message.
- No redirect.

Success criteria:
- Any invalid message is shown and user remains on login page.

Failure conditions:
- Unexpected accept, redirect, or no message.

### Scenario 6: Very long inputs (boundary test)

Title: Long username/password
Assumptions: Fresh session.

Steps:
1. Open the login page.
2. Enter a 256-character string into Username.
3. Enter a 256-character string into Password.
4. Click `Submit`.

Expected results:
- Inputs are either truncated or handled without client-side crash.
- An error message displays (username or password invalid) and no redirect.

Success criteria:
- Page remains stable, shows a validation error.

Failure conditions:
- Browser crash, page error, or unexpected redirect.

### Scenario 7: Special characters and injection attempts

Title: Special chars and injection
Assumptions: Fresh session.

Steps:
1. Open the login page.
2. Enter strings containing special characters (e.g., `'; DROP TABLE users; --`) in Username and Password.
3. Click `Submit`.

Expected results:
- Page treats inputs as invalid and displays error message.
- No sensitive information leaked.

Success criteria:
- Error message visible, no crash, no data leakage.

Failure conditions:
- Unexpected behavior or error stack traces displayed.

### Scenario 8: UI & Accessibility checks (Keyboard and ARIA)

Title: Accessibility and keyboard navigation
Assumptions: Fresh session.

Steps:
1. Open the login page.
2. Verify that focus lands on the page and that the Username field is reachable with Tab.
3. Tab through controls in order: Username -> Password -> Submit.
4. Use Enter/Space to activate Submit while focus is on the button.
5. Inspect roles/labels: Username and Password fields must have accessible names/labels and the Submit button must have role=button.

Expected results:
- Logical tab order, visible focus indicators, accessible names present.
- Keyboard can submit the form.

Success criteria:
- Page is keyboard operable and roles/labels are present.

Failure conditions:
- Missing focusable controls, incorrect tab order, or unlabeled inputs.

### Scenario 9: Error message persistence and clearing

Title: Error message lifecycle
Assumptions: Fresh session.

Steps:
1. Trigger an error (invalid username).
2. Verify error message is displayed.
3. Correct the username to the valid `student` and submit with the correct password.

Expected results:
- Error message disappears on successful login and user is redirected to success page.

Success criteria:
- Error message cleared and success page reached.

Failure conditions:
- Error message persists after successful login or prevents navigation.

### Scenario 10: Regression / Visual checks

Title: Visual/Responsive checks
Assumptions: Fresh session.

Steps:
1. Open the page on multiple viewport sizes (desktop, tablet, mobile).
2. Verify that Username/Password/Submit are visible and usable.

Expected results:
- Components render correctly across viewport sizes; no overlap or hidden controls.

Success criteria:
- Layout works across tested viewports.

Failure conditions:
- Controls hidden or overlapped on smaller viewports.

---

## Automation notes
- The page is simple and well suited for Playwright/Selenium tests.
- Use `getByRole('textbox', { name: 'Username' })`, `getByRole('textbox', { name: 'Password' })`, and `getByRole('button', { name: 'Submit' })` selectors for robust tests.
- Validate successful navigation with `expect(page).toHaveURL(/logged-in-successfully/)` and message assertions with `getByText()`.

Sample Playwright assertions (pseudo):
- await page.getByRole('textbox', { name: 'Username' }).fill('student');
- await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
- await page.getByRole('button', { name: 'Submit' }).click();
- await expect(page).toHaveURL(/logged-in-successfully/);

## Regression and follow-ups
- Add a test that verifies the `Log out` workflow on the success page.
- Add backend-driven tests if API endpoints become available for authentication (to assert failure reasons).

## Test matrix (quick)
- Browsers: Chrome, Firefox, Edge
- Scenarios: Happy path, invalid username, invalid password, empty credentials, whitespace, long inputs, special chars, accessibility, responsive

---

## Completion notes
- File saved to `test-plans/practice-test-login-plan.md` in the workspace.
- This test plan is ready for review and automation.
