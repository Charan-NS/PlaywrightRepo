import test, { chromium, expect } from "@playwright/test";

test (`Creation of new Account in Salesforce`, async({page})=>{

    let username = `charanns444@gmail.com`
    let pwd = `Salesforce4$`

    await page.goto(`https://login.salesforce.com/`)
    await page.locator(`//*[@id="username"]`).fill(username)
    await page.locator(`//*[@id="password"]`).fill(pwd)
    await page.locator(`//*[@id="Login"]`).click()
    await page.waitForTimeout(8000)
    let title = await page.title()
    let expectedTitle = `Home | Salesforce`
    let url = page.url()
    let expectedUrl = `https://customeranalytics2-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home`
    //expect(title).toBe(expectedTitle)
    //expect(url).toBe(expectedUrl)
    await page.locator(`//div[@class="slds-icon-waffle"]`).click()
    await page.getByText(`View All`).click()
    await page.getByPlaceholder(`Search apps or items...`).fill(`Service`)
    await page.waitForTimeout(5000)
    await page.locator(`(//mark[text()="Service"])[1]`).click()
    await page.waitForTimeout(1000)
    await page.locator(`a[title="Accounts"]`).click()
    await page.waitForTimeout(2000)
    //await page.getByRole(`button`).click() --not able to use role as locator
    await page.locator(`//div[@title="New"]`).click()
    let newAccount = `Amazon INC`
    await page.locator(`input[name='Name']`).fill(newAccount)
    await page.locator(`//button[@name='SaveEdit']`).click()
    let toastMessage = await page.locator(`//span[contains(@class,"toastMessage")]`).textContent()
    console.log(toastMessage)
    let expectedToastMessage = `Account "${newAccount}" was created.`
    expect(toastMessage).toContain(expectedToastMessage)
})