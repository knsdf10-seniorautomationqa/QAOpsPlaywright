//const {LoginPage} = require('../pageobjects/LoginPage');
// const {DashboardPage} = require('../pageobjects/DashboardPage');
// const {CartPage} = require('../pageobjects/CartPage');
// const {PaymentPage} = require('../pageobjects/PaymentPage');
// const {OrderHistoryPage} = require('../pageobjects/OrderHistoryPage');
import {LoginPage} from '../pageobjects/LoginPage';
import {DashboardPage} from '../pageobjects/DashboardPage';
import {CartPage} from '../pageobjects/CartPage';
import {PaymentPage} from '../pageobjects/PaymentPage';
import {OrderHistoryPage} from '../pageobjects/OrderHistoryPage';
import {Page} from '@playwright/test'


export class POManager{
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    paymentPage: PaymentPage;
    orderhistoryPage: OrderHistoryPage;
    page: Page;
constructor(page:any){
    
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