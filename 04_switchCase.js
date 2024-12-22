let browserName = `edge`

switch (browserName) {
    case `chrome`:
        console.log(`selected browser is ${browserName}`)
        break;
    
        case `edge`:
            console.log(`selected browser is ${browserName}`)
            break;

    case `firefox`:
        console.log(`selected browser is ${browserName}`)
        break;

    case `safari`:
        console.log(`selected browser is ${browserName}`)
        break;

    default:
        console.log(`Please enter valid browser name`)
        break;
}