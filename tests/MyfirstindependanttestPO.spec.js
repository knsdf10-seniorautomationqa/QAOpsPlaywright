const {test,expect} = require('@playwright/test')
const {LoginPage}=  require('../pageobjects/LoginPage');

//adding a few comments to see how pull requests happen

test.only ('myfirstindependanttest' , async ({page}) =>

{
    
    const firstelement =page.locator('.card-body b');
    //await page.goto ("https://rahulshettyacademy.com/client/#/auth/login");
    const username = "Sadiekhan@mailinator.com";
    const password = "Sadaf@123";
    const loginPage= new LoginPage(page);
    loginPage.goTo();
    loginPage.validLogin(username,password);

   // console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    //only to get the first title
    const adidasshoes = await firstelement.first().textContent();
    console.log( adidasshoes);
    //wait for network tab to become idle
    //await page.waitForLoadState('networkidle');
    //alternatively we can use  another wait
    await firstelement.first().waitFor();
    //to get all item names throughout the page
    const allitemsname = await firstelement.allTextContents();
    console.log(allitemsname);



}

) 



