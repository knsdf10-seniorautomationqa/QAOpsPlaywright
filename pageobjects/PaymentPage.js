const { expect } = require('@playwright/test'); 
class PaymentPage{

    constructor(page){
        this.page=page;
        this.choosecountry =  page.locator("[placeholder*='Country']");
        this.dropdownoptions = page.locator('.ta-results');
        this.checkoutbutton = page.locator(".action__submit ");
        this.verifyemail  = page.locator(".user__name [type='text']").first();
        this.orderConfirmationText = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
    
    }

    async enterCountry(countryname,username){
        await expect (this.verifyemail).toHaveText(username);
        await this.choosecountry.pressSequentially(countryname,{delay:150});
        await this.dropdownoptions.waitFor();
        const optionscount = await this.dropdownoptions.locator('button').count();
 
for (let i=0 ; i<=optionscount ; ++i){

const text = await  this.dropdownoptions.locator('button').nth(i).textContent();
if(text === ' India'){
await this.dropdownoptions.locator('button').nth(i).click();
break;
}

}

    }



    

     async SubmitAndGetOrderId()
{
 await  this.checkoutbutton.click();
 await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
 return await this.orderId.textContent();
}
async gotoOrderhistorypage(){
    await this.page.locator('button:has-text("ORDERS")').click();
}
}

module.exports = {PaymentPage}