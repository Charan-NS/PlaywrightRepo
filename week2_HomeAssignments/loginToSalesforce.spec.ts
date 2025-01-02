import test, { chromium } from "@playwright/test";

test(`Login to Salesforce`,async()=>{
    const browser = await chromium.launch({ headless: false }) //launching browser in non-headless mode
    const browserContext = await browser.newContext() //opening new window
    const page = await browserContext.newPage() //opening new tab
    await page.goto(`https://login.salesforce.com/`) //entering URL in browser
    await page.fill(`input[id="username"]`,`charanns444-tj5v@force.com`) 
    await page.fill('input[id="password"]',`Salesforce@321`) 
    await page.click(`input[id="Login"]`)
    await page.waitForTimeout(10000) //wait for 10 seconds after clicking login button
    let homePageTitle = await page.title()
    console.log(`The title is : ${homePageTitle}`)
})