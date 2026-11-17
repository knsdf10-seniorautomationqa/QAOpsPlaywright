const {test,expect} = require('@playwright/test');
const ExcelJS = require('exceljs');


async function writeExcel(searchText,replacetext,change,filepath){
   
const workbook  = new ExcelJS.Workbook();
await workbook.xlsx.readFile(filepath)
const worksheet = workbook.getWorksheet('Sheet1');
const output = await readExcel(worksheet,searchText);
//console.log(output);

const cell = worksheet.getCell(output.row,output.column+change.colChange);
    cell.value = replacetext;
   await workbook.xlsx.writeFile(filepath);
}   

async function readExcel(worksheet,searchText){
 let output = {row:-1, column :-1};
    worksheet.eachRow((row,rowNumber)=>
    {
        
row.eachCell(async (cell,colNumber)=>{
    //console.log(cell.value);
    if(cell.value === searchText){
        //console.log(rowNumber);
        output.row = rowNumber;

        //console.log(colNumber);
        output.column = colNumber;

    }
   

})

})
 return output;
}

//writeExcel("Mango", "350",{rowChange:0, colChange: 2}, "C:/Users/Mohsi/downloads/excelDownloadTest.xlsx")


 //if u dont want .then(function(){}) -> you can wrap entire thing into a async function excelJS{ and use await on the file reading line}

 test('upload download using excel',async ({page})=>{
    const textSearch = 'Mango';
    const updatedText = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name : 'Download'}).click();
    const download = await downloadPromise;
    
const filePath = 'C:/Users/Mohsi/downloads/download.xlsx';

// 3. Save the downloaded file to your local directory
await download.saveAs(filePath); 
    await writeExcel(textSearch, "350",{rowChange:0, colChange: 2}, filePath)
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles(filePath);
    const textLocator = page.getByText(textSearch);
    const desiredRow =  await page.getByRole('row').filter({has : textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedText);



 })