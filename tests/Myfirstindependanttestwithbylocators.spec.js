const {test,expect} = require('@playwright/test')

test.only ('myfirstindependanttestwithbylocators' , async ({page}) =>

{
    const username = page.getByPlaceholder('email@example.com');
    const password = page.getByPlaceholder('enter your passsword');
    const loginbtn = page.getByRole('button',{name :"login"});
    //const firstelement =page.locator('.card-body b');
    await page.goto ("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill("Sadiekhan@mailinator.com");
    await password.fill("Sadaf@123");
    await loginbtn.click();
   // console.log(await page.title());
    //await expect(page).toHaveTitle("Let's Shop");
    //only to get the first title
    //const adidasshoes = await firstelement.first().textContent();
    //console.log( adidasshoes);
    //wait for network tab to become idle
    //await page.waitForLoadState('networkidle');
    //alternatively we can use  another wait
    await page.locator(".card-body").first().waitFor();
     //now in Addingproducttocart code we had big for loop, here we will try shortening it 
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name : "Add to Cart"}).click();
    
    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();
    await page.locator("div li").first().waitFor();
    
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button", {name : "Checkout"}).click();
    
  
//dynamic dropdown selection of choosing a country based on matching values.
await  page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
await page.getByRole("button", {name :"Ind"}).nth(1).click();
await page.getByText("PLACE ORDER").click();
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();





}

) 



