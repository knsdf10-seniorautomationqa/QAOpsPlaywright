const {test, expect, request} = require ('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload ={userEmail: "Sadiekhan@mailinator.com", userPassword: "Sadaf@123"};
const orderpayload = {orders: [{country: "Burkina Faso", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let response;

test.beforeAll( async()=>
{
const apicontext = await request.newContext();
const apiUtils =new APIUtils(apicontext,loginPayload);
response = await apiUtils.createOrder(orderpayload);

} );


test('Addproductocart', async({page})=>
    {
       // const apiutils = new ApiUtils(apicontext,loginPayload);
        //const orderID = createOrder(orderpayload);

        page.addInitScript(value =>{
            window.localStorage.setItem("token",value);
        },response.token);
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

//we can use these apis fpr pre request and for making things quick. 
//example if ur case is to verify order in the orders page then creating an order can be done usig api

await page.locator('button:has-text("ORDERS")').click();
await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 


}
);