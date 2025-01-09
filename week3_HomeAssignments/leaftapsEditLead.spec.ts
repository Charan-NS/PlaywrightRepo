import test, { chromium, expect } from "@playwright/test";

test(`Edit the lead created in Leaftaps`,async()=>{
    //launching browser instance, opening browser context and new tab
    const browserInstance = await chromium.launch()
    const browserContext = await browserInstance.newContext()
    const page = await browserContext.newPage()

    //below are the updated values for Company name, Annual Revenue and Department
    let companyName = `Amazon`
    let annualRevenue = `1500000`
    let department = `Technology`

    let username = `demosalesmanager`
    let password = `crmsfa`

    //Navigating to leaftaps url and logging in using credentials
    await page.goto(`http://leaftaps.com/opentaps/control/main`)
    await page.locator(`//input[@id="username"]`).fill(username)
    await page.locator(`//input[@id="password"]`).fill(password)
    await page.locator(`//input[@class="decorativeSubmit"]`).click()

    //navigating to CRM page
    await page.locator(`//a[contains(text(),"CRM")]`).click()
    //Choosing the first resulting lead and updating the above mentioned values
    await page.locator(`//a[contains(text(),"Leads")]`).click()
    await page.locator(`//a[contains(text(),"Find Leads")]`).click()
    await page.locator(`(//table[contains(@class,"x-grid3-row-table")]//tbody//tr//td//div//a)[1]`).click()
    await page.locator(`//a[contains(text(),"Edit")]`).click()
    await page.locator(`//input[@id="updateLeadForm_companyName"]`).clear()
    await page.locator(`//input[@id="updateLeadForm_companyName"]`).fill(companyName)
    await page.locator(`//input[@name="annualRevenue"]`).clear()
    await page.locator(`//input[@name="annualRevenue"]`).fill(annualRevenue)
    await page.locator(`//input[@name="departmentName"]`).clear()
    await page.locator(`//input[@name="departmentName"]`).fill(department)
    await page.locator(`//textarea[@name="description"]`).fill(`Description is entered by playwright`)
    await page.locator(`//input[@value="Update"]`).click()

    //validating the updated data
    await page.waitForTimeout(2000)
    let updatedCompanyName = await page.locator(`//span[contains(@id,"companyName_sp")]`).textContent()
    let updatedAnnualRevenue = await page.locator(`//span[contains(@id,"annualRevenue_sp")]`).innerText()
    console.log(updatedAnnualRevenue)
    let amount = parseInt(updatedAnnualRevenue.replaceAll(`$`,``).replaceAll(`,`,``),10).toString()
    console.log(amount)
    let updatedDepartment = await page.locator(`//span[contains(@id,"departmentName_sp")]`).textContent()

    expect(updatedCompanyName).toContain(companyName)
    expect(amount).toBe(annualRevenue)
    expect(updatedDepartment).toBe(department)

    //capturing the page title
    let pageTitile = await page.title()
    console.log(pageTitile)    
})