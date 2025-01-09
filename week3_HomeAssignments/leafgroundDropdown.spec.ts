import test, { chromium, expect } from "@playwright/test";

test(`Leafground - Dropdown test flow`, async()=>{
    //launching browser instance, opening browser context and new tab
    const browserInstance = await chromium.launch()
    const browserContext = await browserInstance.newContext()
    const page = await browserContext.newPage()

    await page.goto(`https://leafground.com/select.xhtml`)
    await page.selectOption(`//select[@class="ui-selectonemenu"]`,{label : `Playwright`})
    let dropdownLocator = page.locator(`//select[@class="ui-selectonemenu"]/option`)
    let toolCount = (await dropdownLocator.count())-1
    console.log(`Number of tools available : ${toolCount}`)
    //index started from 1 instead of 0, to omit 'Select Tool' option in dropdown
    console.log(`Below are the ${toolCount} tools mentioned in dropdown :`)
    for(let i=1;i<toolCount+1;i++){
        let tool = await dropdownLocator.nth(i).textContent()
        console.log(tool)
    }
    await page.locator(`//label[text()="Select Country"]`).click()
    await page.locator(`//li[text()="Brazil"]`).click()
    await page.waitForTimeout(2000)
    await page.locator(`//label[text()="Select City"]`).click()
    let cityList = page.locator(`//ul[contains(@id,"city_items")]`)
    expect(cityList).toContainText(`Salvador`)
    await page.locator(`//span[@class="ui-button-text"]`).click()
    await page.locator(`//li[text()="Playwright"]`).click()
    await page.locator(`//span[@class="ui-button-text"]`).click()
    await page.locator(`//li[text()="Selenium WebDriver"]`).click()
    await page.locator(`//span[@class="ui-button-text"]`).click()
    await page.locator(`//li[text()="RestAssured"]`).click()
    await page.locator(`//label[text()="Select Language"]`).click()
    await page.locator(`//li[contains(text(),"Kannada")]`).click()
    let languages = page.locator(`(//ul[contains(@id,"lang_items")])/li`)
    let languageCount = await languages.count()
    console.log(`Available languages are : `)
    for(let j=1;j<languageCount;j++){
        let language = await languages.nth(j).textContent()
        console.log(language)
    }
    await page.locator(`//label[contains(text(),"Select Values")]`).click()
    await page.locator(`((//ul[contains(@id,"value_items")])/li)[2]`).click()
})