const {test,expect} = require('@playwright/test');

test.only('Browser Context Playwright test',async ({browser})=>
{
const context = await browser.newContext();    
const page = await context.newPage();
//Network interception, aborting all the images inside the page to load it faster.
//await page.route('**/*.{jpg,jpeg,png}', route => route.abort());

const username = page.locator('#username');
const pwd = page.locator("[type='password']");
const signIn = page.locator('#signInBtn');
page.on('request',request => console.log(request.url()));
page.on('reponse', response =>console.log( response.url(), response.status()));
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await username.fill("Sadaf");
await pwd.fill("Learning@830$3mK2");
await signIn.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText("Incorrect");

await username.fill("");
await username.fill("rahulshettyacademy");
await signIn.click();

//console.log(await page.locator(".card-body a").first.textContent());
//getting first array content
//console.log(await cardTitles.nth(0).textContent());
//console.log(await cardTitles.nth(1).textContent());
const cardTitles =page.locator('.card-body a');
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);
});


test('Page Playwright test',async ({page})=>
{
// if you have no cookies or proxy you can use this page command to simply open the context and a new page in the browser.
await page.goto("https://google.com");
console.log(await page.title());
await expect(page).toHaveTitle("Google");
}
);


test('UI controls', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const username = page.locator('#username');
const pwd = page.locator("[type='password']");
const signIn = page.locator('#signInBtn');
const dropdown = page.locator('select.form-control');
const documentrequest = page.locator("[href*= 'documents-request']");
await dropdown.selectOption("consult");
await page.locator('.radiotextsty').nth(1).click();
//or you can use last() instead of nth(1), if there are 2 values you can use first and last and if more than 2 then nth(whatever)

await page.locator('#okayBtn').click();
//expects are assertions in playwright , we are checking if user radiobutton is checked , it will return true/false
await expect(page.locator('.radiotextsty').nth(1)).toBeChecked();
//console.log and ischecked value is used to check the boolean true  /false value in logs 
console.log(await page.locator('.radiotextsty').nth(1).isChecked());
//await page.pause();
await page.locator('#terms').check();
//adding an assertion to check if terms checkbox is checked
await expect(page.locator('#terms')).toBeChecked();
//unchecking the radio button
await page.locator('#terms').uncheck();
//now we dont have assertion to check for unchecked
 expect( await page.locator('#terms').isChecked()).toBeFalsy();
await expect (documentrequest).toHaveAttribute('class','blinkingText');
}

);



test ('Child windows handle', async({browser})=>
{
const context = await browser.newContext();    
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentrequest = page.locator("[href*= 'documents-request']");
const [newPage]= await Promise.all(  
    //in javascript square bracket is an array so promise will make it execute asynchronously
[
 context.waitForEvent('page'),  // listen for any new pages to open so call it before the click of event it returns status of operation promise in pending, rejected or fulfilled status
documentrequest.click(),

] )//new page is opened

const text =await  newPage.locator(".red").textContent();
const array = text.split("@");
const domain = array[1].split(" ")[0];
const username = page.locator('#username');
await username.fill(domain);

console.log(await username.inputValue());

}
);