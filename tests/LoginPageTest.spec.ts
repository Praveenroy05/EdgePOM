import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

let url = "https://rahulshettyacademy.com/client"
const username = "test7lYM@gmail.com"
const password = "Test@123"
const incorrectPassword = "Test"
const emptyPassword = ""

let loginPage : LoginPage
test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page)
    await  loginPage.launchURL(url)
})

test("Valid Login Scenario", {tag: '@smoke'},async ()=>{
    await loginPage.loginIntoApplication(username, password)
    await expect(loginPage.homePageIdentifier).toBeVisible()
})

test("Invalid Login scenario", {tag: ['@smoke', '@regression']},async ()=>{
    await loginPage.invalidLogin(username, incorrectPassword)
    await expect(loginPage.errorMessage).toHaveText("Incorrect email or password.")
})

test("@smoke @regression Check if the application is throwing error for empty password", async ()=>{
    await loginPage.validateEmptyPasswordScenario(username, emptyPassword)
    await expect(loginPage.emptyPassErrormsg).toBeVisible()
})


