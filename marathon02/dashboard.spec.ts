import { id_ID } from "@faker-js/faker";
import test, { chromium, expect } from "@playwright/test";


test (`Creation of new Account in Salesforce`, async({page})=>{

    let username = `charanns444@gmail.com`
    let pwd = `Salesforce4$`

    await page.goto(`https://login.salesforce.com/`);
    await page.locator(`//*[@id="username"]`).fill(username);
    await page.locator(`//*[@id="password"]`).fill(pwd);
    await page.locator(`//*[@id="Login"]`).click();
    await page.waitForLoadState('load');
    await page.locator(`//span[text()='App Launcher']`).click();
    await page.getByText(`View All`).click();
    await page.getByPlaceholder(`Search apps or items...`).fill(`Dashboards`);
    await page.locator(`//p//following::mark`).click();
    await page.locator(`//div[@title='New Dashboard']`).click();
    let enteredName = `Salesforce Automation by Cherry`
    await page.frameLocator(`//iframe[@title='dashboard']`).locator(`#dashboardNameInput`).fill(enteredName);
    await page.frameLocator(`//iframe[@title='dashboard']`).locator(`#submitBtn`).click();
    
    await page.frameLocator(`//iframe[@title='dashboard']`).locator(`//button[text()='Save']`).click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(7000);
    
    /* const dashboardName = await page.frameLocator(`//iframe[@title='dashboard']`).locator("//div[contains(@class,'slds-has-divider_bottom')]/span").innerText();
    expect(dashboardName).toContain('Charan'); */
})

let bearerToken:any
let instURL:any
let tokenType:any
let opportunityId:any
let dashboardID:any
//Generating access token
test(`Generating access token`,async({request})=>{
// hitting POST request
    const response = await request.post(`https://login.salesforce.com/services/oauth2/token`,{
        headers:{
            "Content-type":"application/x-www-form-urlencoded",
            "Connection":"keep-alive"
        },
        form:{
            "grant_type":"password",
            "client_id":"3MVG9WVXk15qiz1KUEHPfiLwqor48BrhmLCd1vdXKcKvqWGEqWJm79mlWOr9FtnMdOzZzLi..iThDu_brWUsg",
            "client_secret":"27E3DC5D2EFBB014D7C226413467E56675FDCAE199FA8E4270582376A9858FA9",
            "username":"charanns444@gmail.com",
            "password":"Salesforce4$"
        }        
    });
//Capturing required things from response
    const respBody = await response.json();
    instURL = respBody.instance_url
    bearerToken = respBody.access_token
    tokenType = respBody.token_type
    console.log(instURL)
    console.log(tokenType)
    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe(`OK`)
})
test(`Fetching created dashboard thru API`,async({request})=>{
    const response = await request.get(`${instURL}/services/data/v62.0/sobjects/Dashboard`,{
        headers:{
            "Authorization":`${tokenType} ${bearerToken}`,
            "Content-Type":"application/json"
        },
    })
    const respBody = await response.json();
    console.log(respBody)
     let dashboardTitle = respBody.recentItems[0].Title
     dashboardID = respBody.recentItems[0].Id
    console.log(`Dashboard Name : ${dashboardTitle} and Dashboard ID : ${dashboardID}`)
    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe(`OK`)
})

test(`Deleting the created dashboard thru API`,async({request})=>{
    console.log(`Id is ${dashboardID}`)
    console.log(`${instURL}`)
    const response = await request.delete(`${instURL}/services/data/v62.0/sobjects/Dashboard/${dashboardID}`,{
        headers:{
            "Authorization":`${tokenType} ${bearerToken}`,
            "Content-Type":"application/json"
        },
    })
    expect(response.status()).toBe(204)
    expect(response.statusText()).toBe(`No Content`)
})