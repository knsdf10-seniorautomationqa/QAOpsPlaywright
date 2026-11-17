const base= require('@playwright/test');


exports.customtest = base.test.extend(

    {
        testdataforOrder :  
        {
username : "Sadiekhan@mailinator.com",
password  : "Sadaf@123",
productName : "ZARA COAT 3"
        }
    }
);