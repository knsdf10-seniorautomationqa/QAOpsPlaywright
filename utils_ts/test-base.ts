//const base= require('@playwright/test');
import {test as baseTest} from '@playwright/test'

interface TestdataforOrder {
 username: string;
 password: string;
 productName: string;
}
export const customtest = baseTest.extend<{testdataforOrder:TestdataforOrder}>(

    {
        testdataforOrder :  
        {
username : "Sadiekhan@mailinator.com",
password  : "Sadaf@123",
productName : "ZARA COAT 3"
        }
    }
);