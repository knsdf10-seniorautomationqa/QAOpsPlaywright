const {test,expect} = require('@playwright/test')

test.only ('myfirstindependanttest' , async ({page}) =>

{
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginbtn = page.locator('#login');
    const firstelement =page.locator('.card-body b');
    await page.goto ("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill("Sadiekhan@mailinator.com");
    await password.fill("Sadaf@123");
    await loginbtn.click();
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



