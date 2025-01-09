import test, { chromium, expect } from "@playwright/test";


test(`Creation of Lead in Leaftaps`, async()=>{
    //launching browser instance, opening browser context and new tab
    const browserInstance = await chromium.launch()
    const browserContext = await browserInstance.newContext()
    const page = await browserContext.newPage()

    let username = `demosalesmanager`
    let password = `crmsfa`
    let company = `Test Leaf INC`
    let firstName = `Charan`
    let lastName = `NS`
    //Login to Leaftaps
    await page.goto(`http://leaftaps.com/opentaps/control/main`)
    await page.locator(`#username`).fill(username)
    await page.locator(`#password`).fill(password)
    await page.locator(`.decorativeSubmit`).click()
    //Creating new lead in leaftaps
    await page.locator(`//*[contains(text(),"CRM")]`).click()
    await page.locator('((//*[@class="x-panel-header"])/a)[2]').click()
    await page.locator(`//*[@id="left-content-column"] //a[contains(text(),"Create Lead")]`).click()
    await page.locator(`[id*="companyName"]`).fill(company)
    await page.locator(`(//input[contains(@id,"firstName")])[1]`).fill(firstName)
    await page.locator(`(//input[contains(@id,"lastName")])[1]`).fill(lastName)
    await page.locator(`//input[@name="personalTitle"]`).fill(`Mr`)
    await page.locator(`//input[@name="generalProfTitle"]`).fill(`SSE`)
    await page.locator(`//input[@name="annualRevenue"]`).fill(`2000000`)
    await page.locator(`//input[@name="departmentName"]`).fill(`Information Technology`)
    await page.locator(`//input[@id="createLeadForm_primaryPhoneNumber"]`).fill(`9876543210`)
    await page.selectOption(`//select[contains(@id,"Source")]`, {index : 4})
    await page.selectOption(`//select[contains(@id,"industry")]`, {value : `IND_SOFTWARE`})
    await page.selectOption(`//select[contains(@id,"ownershipEnumId")]`,{label : `Public Corporation`})
    await page.locator(`//input[@name='submitButton']`).click()
    await page.waitForTimeout(6000)
    //Validating Company name, First name and Last name after creation of new lead
    let companyName = await page.locator(`//span[contains(@id,"companyName")]`).textContent()
    let leadFirstName = await page.locator(`//span[contains(@id,"firstName_sp")]`).innerText()
    let leadLastName = await page.locator(`//span[contains(@id,"lastName_sp")]`).textContent()
    expect(companyName).toContain(company)
    expect(leadFirstName).toBe(firstName)
    expect(leadLastName).toBe(lastName)
    //validation of page title after creation of new lead
    let viewLead = await page.title()
    expect(viewLead).toBe(`View Lead | opentaps CRM`)
})