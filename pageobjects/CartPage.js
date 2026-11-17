const { expect } = require('@playwright/test'); // <-- ADD THIS LINE
class CartPage {

    constructor(page){
this.page =page;
this.checkoutbtn = page.locator('text=Checkout');
this.cartProducts = page.locator("div li").first();

    }

    async checkout(){
        await this.checkoutbtn.click();

    }



 getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}
async VerifyProductIsDisplayed(productName)
{
   
    await this.cartProducts.waitFor();
    const bool =await this.getProductLocator(productName).isVisible();
    await expect(bool).toBeTruthy();

}

}
module.exports = {CartPage};