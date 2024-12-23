let word = `charan`
let arrName = word.split("")

for(let j=0;j<word.length;j++){
    if(j%2 !=0){
        arrName[j] = arrName[j].toUpperCase()
    }
}
modifiedWord = arrName.join("")
console.log(`Input : ${word}`)
console.log(`Output : ${modifiedWord}`)