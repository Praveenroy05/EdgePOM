import { Page } from "@playwright";
import { Locator } from "@playwright";

export class DashboardPage{

    private page : Page
    products : Locator
    addToCartSuccessMsg : Locator
    viewPageProductName : Locator

    constructor(page : Page){
        this.page = page
        this.products = this.page.locator("div.card-body")
        this.addToCartSuccessMsg = this.page.locator("#toast-container")
        this.viewPageProductName = this.page.locator("div.rtl-text h2")    
        // this.page.locator("div.rtl-text").locator("h2")
    }


    async searchAndAddProductToCart(productName: string){
        await this.products.last().waitFor()
        // count() - It will count the total matching elements
        const countOfProducts = await this.products.count() // 3 - 0,1,2
        for(let i=0;i<countOfProducts; i++){
            const productText = await this.products.nth(i).locator("b").innerText()
            if(productText === productName){
                await this.products.nth(i).locator("button").last().click()
                break
            }
        }


        // 3 - first(), last(), nth(1)
    }

    async searchAndViewProductDetails(productName: string){
        await this.products.last().waitFor()
        const countOfProducts = await this.products.count() // 3 - 0,1,2
        for(let i=0;i<countOfProducts; i++){
            const productText = await this.products.nth(i).locator("b").innerText()
            if(productText === productName){
                await this.products.nth(i).locator("button").first().click()
                break
            }
        }
    }
   
}