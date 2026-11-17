const {test, expect, request} = require ('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload ={userEmail: "Sadiekhan@mailinator.com", userPassword: "Sadaf@123"};
const orderpayload = {orders: [{country: "Burkina Faso", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const fakepayloadOrders = {data:[],message:"No Orders"}
let response;


test.beforeAll( async()=>
{
const apicontext = await request.newContext();
const apiUtils =new APIUtils(apicontext,loginPayload);
response = await apiUtils.createOrder(orderpayload);

} );

test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakepayloadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
 
 
 
});
