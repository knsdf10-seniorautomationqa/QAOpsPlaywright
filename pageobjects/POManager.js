const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const {PaymentPage} = require('../pageobjects/PaymentPage');
const {OrderHistoryPage} = require('../pageobjects/OrderHistoryPage');


class POManager{
constructor(page){
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page);
    this.paymentPage = new PaymentPage(page);
    this.orderhistoryPage = new OrderHistoryPage(page);
}

getloginPage(){
return this.loginPage;
}

getdashboardPage(){
return this.dashboardPage;
}

getcartPage(){
return this.cartPage;
}

getpaymentPage(){
return this.paymentPage;
}

getorderHistoryPage(){
return this.orderhistoryPage;
}


}

module.exports = {POManager};