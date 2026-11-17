const { When, Then,Given } = require('@cucumber/cucumber')
const {expect}= require('@playwright/test')
const playwright = require('@playwright/test')
const {POManager} = require('../../pageobjects/POManager')


Given('a login to ecommerce application with {string} and {string}',{timeout:100*1000},  async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  this.username = username;

const loginPage = this.poManager.getloginPage();
await loginPage.goTo();
await loginPage.validLogin(username,password);
});

When('Add {string} to Cart',async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getdashboardPage();
await this.dashboardPage.searchProductAddCart(productName);
await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed successfully',async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = this.poManager.getcartPage();
cartPage.VerifyProductIsDisplayed(productName)
await cartPage.checkout();
});

When('Enter valid details and place the order',async function () {
  // Write code here that turns the phrase above into concrete actions
 const paymentPage = this.poManager.getpaymentPage();
const countryname = "ind";
await paymentPage.enterCountry(countryname,this.username);
this.orderId = await paymentPage.SubmitAndGetOrderId();

console.log(this.orderId);
});

Then('Verify order is present in OrderHistory page',async function () {
   await this.dashboardPage.navigateToOrders();
   const ordersHistoryPage = this.poManager.getorderHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(this.orderId);
   expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});


When('we enter incorrect details',async function () {
  const username = this.page.locator('#username');
const pwd = this.page.locator("[type='password']");
const signIn = this.page.locator('#signInBtn');
await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await this.page.title());
await username.fill("Sadaf");
await pwd.fill("Learning@830$3mK2");
await signIn.click();

});

Then('Verify error message appears', async function () {
 console.log(await this.page.locator("[style*='block']").textContent());
await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});
