// Locators and methods related to login page

// Valid login scenario - Valid credentail
// Invalid login scenario - Invalid credential
// Invalid login scenario - Password is empty

import {Locator, Page} from '@playwright'

export class LoginPage{

    // Locators - Properties
    private page : Page
    private username : Locator 
    private password : Locator
    private loginBtn : Locator
    errorMessage : Locator
    emptyPassErrormsg : Locator
    homePageIdentifier : Locator

    constructor(page1 :Page){
        this.page = page1
        this.username = this.page.getByPlaceholder("email@example.com")
        this.password = this.page.getByPlaceholder("enter your passsword")
        this.loginBtn = this.page.locator("#login")
        this.errorMessage = this.page.locator("#toast-container")
        this.emptyPassErrormsg = this.page.getByText("*Password is required")
        this.homePageIdentifier = this.page.locator(".fa-sign-out")
    }

    async launchURL(url: string){
        await this.page.goto(url)
    }

    async loginIntoApplication(username :string, password: string){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
    }

    async invalidLogin(username : string, invalidPassowrd :string){
        await this.loginIntoApplication(username, invalidPassowrd) 
    }

    async validateEmptyPasswordScenario(username: string, emptyPassword: string){
        await this.loginIntoApplication(username, emptyPassword)
    }
}



