const {test,expect,request} = require('@playwright/test');
const {customtest} = require('../utils/fixtures.js');



customtest('Fixtures demo',async({authenticatedPage, createOrder, testdataforOrders})=>{

//login to application/create order and verify if the order is created from the history page
await authenticatedPage.goto("https://rahulshettyacademy.com/client");
console.log(testdataforOrders.productName)
await authenticatedPage.locator('button:has-text("ORDERS")').click();
await authenticatedPage.locator("tbody").waitFor();
await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();


}
);