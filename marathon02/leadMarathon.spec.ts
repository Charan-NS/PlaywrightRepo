import test, { expect } from '@playwright/test'

let accessToken:any
let instUrl:any
let tokenType:any
let LeadId:any
let lname:any
let fname:any

test(`Generate token`,async({request})=>{const response=await request.post(`https://login.salesforce.com/services/oauth2/token`,{
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "Connection":"keep-alive"
    },
    form:{
        "grant_type":"password",
        "client_id":"3MVG9WVXk15qiz1KUEHPfiLwqor48BrhmLCd1vdXKcKvqWGEqWJm79mlWOr9FtnMdOzZzLi..iThDu_brWUsg",
        "client_secret":"27E3DC5D2EFBB014D7C226413467E56675FDCAE199FA8E4270582376A9858FA9",
        "username":"charanns444@gmail.com",
        "password":"Salesforce4$"        
    }
})
 const resBody=await response.json()
 console.log(resBody)
 accessToken=resBody.access_token
 instUrl=resBody.instance_url
 console.log(instUrl)
 tokenType=resBody.token_type
 expect(response.status()).toBe(200)
})

test(`create lead in salesforce`,async({request})=>{

    const  response= await request.post(`${instUrl}/services/data/v62.0/sobjects/Lead`,
        {
            headers:{
                "Content-Type":"application/json",
                //Bearer 00D5h0000098pgR!AQwAQHJmghS8Ol8uB5JVFC8oMQ0bmYrtobLvfRJr_3aRKlCSeaC50tgQg6FBeH7fZ8OFTq_LeEse8tYalhhfgNq7pYkA2dM4
                "Authorization":`${tokenType} ${accessToken}`
            },
            data:{
                    "FirstName":`Kiran`,
                    "LastName":`Delete`,
                    "Company":  `Qeagle`             
            }
        })

        const resBody=await response.json()
        console.log(resBody)
        LeadId=resBody.id   
        })

        test(`Get lead in salesforce before update`,async({request})=>{

            const  response= await request.get(`${instUrl}/services/data/v62.0/sobjects/Lead/${LeadId}`,
                {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`${tokenType} ${accessToken}`
                    },
                  
                })
        
                const resBody=await response.json()
                console.log(resBody)
                lname=resBody.LastName
                fname=resBody.FirstName
                console.log(lname)
                })

test(`Update lead in salesforce`,async({request})=>{

    const  response= await request.patch(`${instUrl}/services/data/v62.0/sobjects/Lead/${LeadId}`,
        {
            headers:{
                "Content-Type":"application/json",
                "Authorization":`${tokenType} ${accessToken}`
                },
                data:{
                                    
                "Salutation":  `Mr`,
                "FirstName":"Lead"           
                }
                })
            })
test(`Get lead in salesforce after update`,async({request})=>{

            const  response= await request.get(`${instUrl}/services/data/v62.0/sobjects/Lead/${LeadId}`,
                {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`${tokenType} ${accessToken}`
                    },
                  
                })
        
                const resBody=await response.json()
                console.log(resBody)
                lname=resBody.LastName
                fname=resBody.FirstName
                console.log(lname)
                })

test(`Delete lead from UI`,async({page})=>{
    let username = `charanns444@gmail.com`
    let pwd = `Salesforce4$`

    await page.goto(`https://login.salesforce.com/`);
    await page.locator(`//*[@id="username"]`).fill(username);
    await page.locator(`//*[@id="password"]`).fill(pwd);
    await page.locator(`//*[@id="Login"]`).click();
    await page.waitForLoadState('load');
    await page.locator(`//span[text()='App Launcher']`).click();
    await page.getByText(`View All`).click();
    await page.getByPlaceholder(`Search apps or items...`).fill(`leads`);
    await page.locator(`//p//following::mark`).click();
    await page.locator(`//span[text()='Show Actions']`).first().click();
    await page.locator(`//a[@title='Delete']`).click();
    await page.locator(`//span[text()='Delete']`).click();
    await page.getByPlaceholder(`Search this list...`).fill(`${fname} ${lname}`);
    await page.getByPlaceholder(`Search this list...`).press('Enter');
    let actualTxt = await page.locator(`//p//following::span[text()='No items to display.']`).innerText();
    let expectedTxt = `No items to display.`
    expect(actualTxt).toBe(expectedTxt)


})