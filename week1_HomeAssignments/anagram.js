let text1 = `inch`
let text2 = 'chin'

if(text1.length != text2.length){
    console.log(`Lengths mismatch, therefore the strings are not an Anagram`)
}
else{
    let arr1 = text1.split(``).sort().join("")
    let arr2 = text2.split(``).sort().join("")
    if(arr1 == arr2){
        console.log(`The given strings are Anagram.`)
    }
    else{
        console.log(`The given strings are not an Anagram.`)
    }
}