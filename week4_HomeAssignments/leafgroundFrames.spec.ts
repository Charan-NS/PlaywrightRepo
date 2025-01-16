import test, { expect } from "@playwright/test";
// Use required fixtures
test(`Handling frames`,async({page})=>{
// Navigate to https://leafground.com/frame.xhtml
    await page.goto(`https://leafground.com/frame.xhtml`);
// Interact with the Click Me button inside frame
    let frameOne = page.frameLocator(`(//iframe)[1]`).locator(`#Click`);
    frameOne.click();
// Assert the text changed after clicking the button
    await page.waitForTimeout(3000)
    let textOne = await frameOne.innerText();
    let expectedTextOne = `Hurray! You Clicked Me.`
    expect(textOne).toBe(expectedTextOne);
// Get the total count of frames present in the page
    let count1 = page.frames().length;
    let count = count1-1;//because previous line of code fetches all frames including main HTML
    console.log(`There are ${count} frames in this page.`)
// Interact with the Click Me button present inside the nested frames
    let frameTwo = page.frameLocator(`(//iframe)[3]`).frameLocator(`#frame2`).locator(`#Click`);    
    frameTwo.click();
// Assert the text changed after clicking the button
    await page.waitForTimeout(3000)
    let textTwo = await frameTwo.innerText();
    let expectedTextTwo = `Hurray! You Clicked Me.`
    expect(textTwo).toBe(expectedTextTwo);
})