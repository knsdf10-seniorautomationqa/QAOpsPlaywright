//const { test,expect } = require('@playwright/test'); // <-- ADD THIS LINE
import {test, expect,Locator,Page} from '@playwright/test';

export class CartPage {
checkoutbtn : Locator;
cartProducts: Locator;
page: Page
    constructor(page: Page){
this.page =page;
this.checkoutbtn = page.locator('text=Checkout');
this.cartProducts = page.locator("div li").first();

    }

    async checkout(){
        await this.checkoutbtn.click();

    }



 getProductLocator(productName:string)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}
async VerifyProductIsDisplayed(productName: string)
{
   
    await this.cartProducts.waitFor();
    const bool =await this.getProductLocator(productName).isVisible();
    await expect(bool).toBeTruthy();

}

}
module.exports = {CartPage};