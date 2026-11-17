const { After, Before,AfterStep,BeforeStep,Status } = require('@cucumber/cucumber')
const playwright = require('@playwright/test')
const { POManager } = require('../../pageobjects/POManager')


// Synchronous
Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
})

After(function () {
    // Assuming this.driver is a selenium webdriver
    console.log('Hi I am executing last')
})