import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import products from '../TestData/products.json'



let loginPage : LoginPage
let dashboardPage : DashboardPage
for(let data of products){
test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    await  loginPage.launchURL(data.url)
})

    test("Add the product to cart", async ()=>{
        await loginPage.loginIntoApplication(data.username, data.password)
        await dashboardPage.searchAndAddProductToCart(data.productName)
        await expect(dashboardPage.addToCartSuccessMsg).toHaveText("Product Added To Cart")
    })

    test("Search and validate the product", async ()=>{
        await  loginPage.launchURL(data.url)
        await loginPage.loginIntoApplication(data.username, data.password)
        await dashboardPage.searchAndViewProductDetails(data.productName)
        await expect(dashboardPage.viewPageProductName).toHaveText(data.productName.toLowerCase())
    })
}

// Json or Excel

// JSON - Javascript Object Notation

// let i = [10,20,30,40]


//  let product = 
//  [
//   {
//     url: 'https://rahulshettyacademy.com/client',
//     username: 'test7lYM@gmail.com',
//     password: 'Test@123',
//     productName: 'IPHONE 13 PRO'
//   },
//   {
//     url: 'https://rahulshettyacademy.com/client',
//     username: 'test7lYM@gmail.com',
//     password: 'Test@123',
//     productName: 'ZARA COAT 3'
//   },
//   {
//     url: 'https://rahulshettyacademy.com/client',
//     username: 'test7lYM@gmail.com',
//     password: 'Test@123',
//     productName: 'ADIDAS ORIGINAL'
//   }
// ]

// console.log(product[2].productName);



// // for of loop
// for(let element of product){
//     console.log(element.productName);
// }

// Allure
// github
// jenkins
// AI
