const base  = require ('@playwright/test');
const {APIUtils}=require('./APIUtils.js')
const loginPayload ={userEmail: "Sadiekhan@mailinator.com", userPassword: "Sadaf@123"};
const orderpayload = {orders: [{country: "Burkina Faso", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const {request} = require('@playwright/test');
const { isContext } = require('node:vm');


exports.customtest = base.test.extend({
    authenticatedPage : async({browser}, use)=>
        {

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginbtn = page.locator('#login');
    await page.goto ("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill("Sadiekhan@mailinator.com");
    await password.fill("Sadaf@123");
    await loginbtn.click();
    await page.waitForLoadState('networkidle');
    await use(page);
    await context.close();
    },
    createOrder : async({}, use)=>{
        const apicontext = await request.newContext();
        const apiUtils =new APIUtils(apicontext,loginPayload);
        const response = await apiUtils.createOrder(orderpayload);
       await use(response);
       await apicontext.dispose();

},
testdataforOrders :{
productName :  "ADIDAS ORIGINALS"

}
    }
);