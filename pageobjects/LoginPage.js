class LoginPage{

constructor(page){
    this.page=page;
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.signINbtn = page.locator('#login');
}
async goTo(){
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

async validLogin(username, password){
    await this.username.fill(username);
     await this.password.fill(password);
     await this.signINbtn .click();
     await this.page.waitForLoadState('networkidle');
    
}

}
 module.exports={LoginPage}; 