let browser = `chrome`

function checkBrowserVersion(callback){
    setTimeout(() => {
        callback(browser)
        
    }, 2000);
}

function validateBrowser(browser){
    console.log(`Browser version is ${browser}`)
}

checkBrowserVersion(validateBrowser) //passing one function as parameter into another function