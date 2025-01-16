import test, { expect } from "@playwright/test";
//Simple Window(single promise)
test(` Handling multiple browser tabs`,async({page,context})=>{

    page.on("dialog",alert => {
        let alertText = alert.message();
        console.log(alertText);
        let expectedText = `Are you sure?`
        expect(alertText).toBe(expectedText);
        alert.accept();
    })
    //Login to Leaftaps
    await page.goto(`http://leaftaps.com/opentaps/control/main`);
    let username = `demosalesmanager`
    let password = `crmsfa`
    await page.locator(`#username`).fill(username);
    await page.locator(`#password`).fill(password);
    await page.locator(`.decorativeSubmit`).click();
// Click CRM/SFA
    await page.locator(`//*[contains(text(),"CRM")]`).click();
// Click Leads
    await page.locator('((//*[@class="x-panel-header"])/a)[2]').click()
// Click Merge Leads
    await page.locator(`//a[text()='Merge Leads']`).click();
// Click From Lead widget
    const promiseOne = context.waitForEvent(`page`);
    await page.locator(`(//table[@id='widget_ComboBox_partyIdFrom']//following::a)[1]`).click();
    const fromLead = await promiseOne;
// Select the first resulting lead id
    await expect(fromLead.locator(`//tbody//tr//td//div//a`).first()).toBeVisible();
    await fromLead.locator(`//tbody//tr//td//div//a`).first().click();
// Click To Lead widget
    const promiseTwo = context.waitForEvent(`page`);
    await page.locator(`(//table[@id='widget_ComboBox_partyIdTo']//following::a)[1]`).click();
    const toLead = await promiseTwo;
// Select the second resulting lead id
    await expect(toLead.locator(`((//table)[5]//div//a)[1]`)).toBeVisible();
    await toLead.locator(`((//table)[5]//div//a)[1]`).click();  
// Click Merge button
    await page.locator(`//a[text()='Merge']`).click();
// Get the message and type of the alert
// Accept the alert
   await page.waitForTimeout(5000)

// Click Merge button
    await page.locator(`//a[text()='Merge Leads']`).click();
    await page.waitForTimeout(3000)
// Assert the title of the page
    let title = await page.title();
    console.log(`Title : ${title}`);
})