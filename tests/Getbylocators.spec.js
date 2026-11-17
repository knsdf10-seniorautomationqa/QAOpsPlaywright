const {test,expect} = require ('@playwright/test');
//or
//import {test,expect} from '@playwright/test'; 
//const { text } = require('node:stream/consumers');


test ('Getbylocatorstest', async({page})=>
{
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel('Check me out if you Love IceCreams!').click();
await page.getByLabel('Employed').check();
await page.getByLabel('Gender').selectOption('Female');
await page.getByPlaceholder('Password').fill('abc@123');
await page.getByRole('button', {name : 'Submit'}).click();
await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
//we can also place assertions. 5 seconds timeout for expect assertions, but if the message is taking long and is okay with client then we need to introduce exceptions for overwriting default timeout
//here we give timeout 10000 milliseconds means 10 seconds step level
//if u feel application is legacy one and globally you wanna change timeout then goto config.js and under expect block define time
await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout: 10_000});
await page.getByRole("link", {name : "Shop"}).click();
await  page.locator('app-card').filter({hasText:'Nokia  Edge'}).getByRole("button").click();

 
}

);


test ('TestLeveltimeouts', async({page})=>
{//you can also define test timeout , that means time required for compelte test to run else it will take definition from config.js
    test.setTimeout(60000);
    //you can define text level timeouts like below and then use the variable slow expect instead of expect
const slowexpect= expect.timeout({timeout :9000});
//also
page.setDefaultTimeout(9000);
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel('Check me out if you Love IceCreams!').click();
await page.getByLabel('Employed').check();
await page.getByLabel('Gender').selectOption('Female');
await page.getByPlaceholder('Password').fill('abc@123');
await page.getByRole('button', {name : 'Submit'}).click();
await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
//if u define timeout under expect block in js file it will impact all the tests 
//now we defined it on the test level so now we can use it wherever we wantfor customized timeouts
await slowexpect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();
await page.getByRole("link", {name : "Shop"}).click();
await  page.locator('app-card').filter({hasText:'Nokia  Edge'}).getByRole("button").click();

 
}

);