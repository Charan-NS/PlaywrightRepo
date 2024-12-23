let sentence = `Wish you happy new year`
    let splitWords = sentence.split(" ")
console.log(`input : ${sentence}`)
    for(let i=0;i<splitWords.length;i++){
    if(i%2!=0){
        splitWords[i] = splitWords[i].split("").reverse().join("")
    }
}
reversedOddWords = splitWords.join(" ")
console.log(`Output : ${reversedOddWords}`)