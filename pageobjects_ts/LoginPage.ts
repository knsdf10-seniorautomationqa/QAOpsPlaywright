import {test,expect,Locator,Page} from '@playwright/test';


export class LoginPage{
username : Locator;
password : Locator;
signINbtn : Locator;
page: Page
constructor(page:Page){
    this.page=page;
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.signINbtn = page.locator('#login');
}
async goTo(){
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

async validLogin(usrname:string, passwrd:string){
    
    await this.username.fill(usrname);
     await this.password.fill(passwrd);
     await this.signINbtn .click();
     await this.page.waitForLoadState('networkidle');
    
}

}
 module.exports={LoginPage}; 