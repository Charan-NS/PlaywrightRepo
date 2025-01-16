import test, { expect } from "@playwright/test";

test (`Handling multiple windows using promise all`,async({page,context})=>{

//Load the URL (https://login.salesforce.com/)
await page.goto(`https://login.salesforce.com/`)
//Enter the username and password
let username = `charanns444@gmail.com`
let pwd = `Salesforce4$`
await page.locator(`//*[@id="username"]`).fill(username);
await page.locator(`//*[@id="password"]`).fill(pwd);
await page.locator(`//*[@id="Login"]`).click();
await page.waitForLoadState('load');

// Click on the "Learn More” button under Mobile Publisher
const [promises] = await Promise.all([
context.waitForEvent(`page`),
await page.locator(`//span[text()=': Mobile Publisher']`).click()
]);

const allPages = promises.context().pages();
console.log(allPages.length)
// Capture the title of the new window that opens
let webPage: any
for (let i=0;i<allPages.length;i++){
    const title = await allPages[i].title();
    await page.waitForTimeout(2000)
    console.log(`Tile : ${title}`)
    if(i==1)
    webPage = allPages[i]
}
// Click the ‘Confirm’ button on the page
await webPage.locator(`//button[text()='Confirm']`).click();

// Assert the title and url of the page
await webPage.waitForLoadState('load')
let url = webPage.url();
let windowTitle = await webPage.title();
let expectedURL = `https://www.salesforce.com/service/cloud/`
let expectedWindowTitle = `Service Cloud: AI-powered Customer Service Agent Console | Salesforce US`
console.log(url);
console.log(windowTitle);
expect(url).toBe(expectedURL);
expect(windowTitle).toBe(expectedWindowTitle);
await page.waitForTimeout(3000)
})