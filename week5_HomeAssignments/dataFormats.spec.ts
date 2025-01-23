import test from "@playwright/test"
import { parse } from "csv-parse/sync"
import fs from 'fs'
import path from "path"
import info from '../../data/leaftapsDetails.json'

    const loginData = parse(fs.readFileSync(path.join(__dirname,`../../data/leaftapsCredentials.csv`),'utf-8'),{
        columns:true
    })

    for(let data of loginData){
    test(`Data Parameterization using different test data formats ${data.TestCaseID}`,async({page})=>{

// Navigate to http://leaftaps.com/opentaps/control/main    
    await page.goto(`http://leaftaps.com/opentaps/control/main`);
// Enter the username and password
    await page.locator(`#username`).fill(data.Username);
    await page.locator(`#password`).fill(data.Password);
// Click Login
    await page.locator(`.decorativeSubmit`).click();
//Click CRM/SFA
    await page.locator(`//*[contains(text(),"CRM")]`).click();
    await page.locator("//a[text()='Leads']").click();
// Click Create Leads
    await page.locator(`//a[text()='Create Lead']`).click();
// Fill all the mandatory fields such as Company name, First name and Last name
for (let details of info){
    await page.locator(`[id*="companyName"]`).fill(details.companyName);
    await page.locator(`//*[@id="createLeadForm_firstName"]`).fill(details.firstName);
    await page.locator(`//*[@id="createLeadForm_lastName"]`).fill(details.lastName);
// Select Direct Mail from the Source dropdown using label
    await page.selectOption(`//*[contains(@id,"Source")]`, {label : `Direct Mail`});
// Select Demo Marketing Campaign from the Marketing Campaign dropdown using value
    await page.selectOption(`//*[@name="marketingCampaignId"]`,{value:"DEMO_MKTG_CAMP"});
// Get the count and print all the values in the Marketing Campaign dropdown
    let campaignLocator = page.locator(`//*[@name="marketingCampaignId"]/option`);
    let marketingCampaigns = await campaignLocator.allInnerTexts();
    let campaignCount = (marketingCampaigns.length)-1;//blank option in the dropdown is omitted
    for(let i=1;i<= campaignCount;i++){
        console.log(marketingCampaigns[i]);
    }
    
    console.log(`There are ${campaignCount} types of Campaigns`);
    
// Select General Services from the Industry dropdown using index
    await page.selectOption(`//*[@name="industryEnumId"]`,{index : 6});
// Select INR from the Preferred Currency dropdown
    await page.selectOption(`//*[@name="currencyUomId"]`,{value : "INR"});
// Select India from the Country dropdown
    await page.selectOption(`//*[@name="generalCountryGeoId"]`,{label : "India"});
// Select any state from the State dropdown
    await page.selectOption(`//*[@name="generalStateProvinceGeoId"]`,{label : 'KARNATAKA'})
// Get the count of all states and print the values in the console
    let stateLocator = page.locator(`//*[@name="generalStateProvinceGeoId"]/option`)
    let stateList = await stateLocator.allInnerTexts();
    for(let j=1;j<stateList.length;j++){
        console.log(stateList[j])
    }
    let stateCount = (stateList.length)-1;//blank option in the dropdown is omitted
    console.log(`There are ${stateCount} states/provinces listed here.` );

// Click Create Lead
    await page.locator(`.smallSubmit`).click()
    await page.waitForTimeout(6000)
}})
    }
