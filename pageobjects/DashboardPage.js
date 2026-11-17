class DashboardPage{
constructor(page){
this.page = page;
this.products =  page.locator('.card-body');
this.productsText =  page.locator('.card-body b');
this.cart = page.locator("[routerlink*= '/cart']");
this.orders = page.locator("button[routerlink*='myorders']");
}

async navigateToOrders()
{
    await this.orders.click();
}
async searchProductAddCart(productName){
    await this.page.locator('.card-body b').first().waitFor();
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const totalitems = await this.products.count();
    //console.log(totalitems);
    for(let i=0 ; i<=totalitems ; ++i){
        if( await this.products.nth(i).locator('b').textContent() === productName){
            await this.products.nth(i).locator("text=Add to Cart").click();
            break;
     }
    
    
    }
    
}

async navigateToCart(){

    await this.cart.click();
    await this.page.locator("div li").first().waitFor();
}


}
module.exports={DashboardPage};