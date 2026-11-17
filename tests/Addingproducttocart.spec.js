const {test,expect}= require('@playwright/test')
const {customtest}= require('../utils/test-base')
const {POManager} = require('../pageobjects/POManager')
//json->string ->jsobject
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

for(const data of dataset){

test(` Client App login for ${data.productName}`, { tag: '@Web' },async({page})=>
    {

const poManager = new POManager(page);
const loginPage = poManager.getloginPage();

const product = data.productName;
await loginPage.goTo();
await loginPage.validLogin(data.username,data.password);
await expect(page).toHaveTitle("Let's Shop");
const dashboardPage = poManager.getdashboardPage();

//sometimes images may not load even though the page has loaded so we will write one line to make sure the images have loaded
await dashboardPage.searchProductAddCart(product);
await dashboardPage.navigateToCart();
const cartPage = poManager.getcartPage();
cartPage.VerifyProductIsDisplayed(product)
await cartPage.checkout();

const paymentPage = poManager.getpaymentPage();
const countryname = "ind";

await paymentPage.enterCountry(countryname,data.username);


const orderId = await paymentPage.SubmitAndGetOrderId();
console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getorderHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
 


}
)
}




customtest(` Client App login with fixtures`, { tag: '@Web' },async({page,testdataforOrder})=>
    {

const poManager = new POManager(page);
const loginPage = poManager.getloginPage();

const product = testdataforOrder.productName;
await loginPage.goTo();
await loginPage.validLogin(testdataforOrder.username,testdataforOrder.password);
await expect(page).toHaveTitle("Let's Shop");
const dashboardPage = poManager.getdashboardPage();

//sometimes images may not load even though the page has loaded so we will write one line to make sure the images have loaded
await dashboardPage.searchProductAddCart(product);
await dashboardPage.navigateToCart();
const cartPage = poManager.getcartPage();
cartPage.VerifyProductIsDisplayed(product)
await cartPage.checkout();
    }
)