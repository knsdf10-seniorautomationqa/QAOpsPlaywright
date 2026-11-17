const {test} = require ('@playwright/test');

test('Security test request interception', async ({ page }) => {

  const username = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const loginbtn = page.locator('#login');
  const firstelement = page.locator('.card-body b');
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await username.fill("Sadiekhan@mailinator.com");
  await password.fill("Sadaf@123");
  await loginbtn.click();
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForLoadState('networkidle');
  

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({
      url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6ad60df093b084c41f59c2cg'
    })
  )
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
  

})
