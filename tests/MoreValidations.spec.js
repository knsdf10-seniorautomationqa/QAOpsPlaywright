import {test,expect} from '@playwright/test';

// test.describe.configure({mode: 'parallel'});

test('Popupshandling', async({page})=>
{
await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
// await page.goto('https://www.google.com/');
// page.goBack();
// page.goForward();
await expect(page.locator('#displayed-text')).toBeVisible();
await  page.locator('#hide-textbox').click();
await expect(page.locator('#displayed-text')).toBeHidden();

//to click ok and cancel on alert boxes which we call dialog
await page.locator('#confirmbtn').click();

//this will click on ok buttton
 page.on("dialog", dialog => dialog.accept());
//await page.pause();

//this will click on cancel button
await page.on('dialog',dialog =>dialog.dismiss());

//how to hover over items
await page.locator('#mousehover').hover();

//how to handle frames

const framesPage =  page.frameLocator('#courses-iframe');
await framesPage.locator("li a[href* ='lifetime-access']:visible").click();
const textCheck = await framesPage.locator(".text h2").textContent();
console.log(textCheck.split(' ')[1]);
    }
)

test('Screenshot and Visual Comparison', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

await expect(page.locator('#displayed-text')).toBeVisible();
await  page.locator('#hide-textbox').click();
await page.screenshot({path : 'fullpagescreenshot.png'});
await expect(page.locator('#displayed-text')).toBeHidden();
await page.getByText('Element Displayed Example').screenshot({path : 'Elementscreenshot.png'});
})

test('Visual testing',async({page})=>{
    await page.goto('https://google.com');
     expect(await page.screenshot()).toMatchSnapshot('landing.png');



})