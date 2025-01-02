//checking if data is fetched from server.
const data = false

//using 'Promise' to check if data is fetched
function fetchDataFromDatabase(data){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(data===true){
                resolve(`Data fetched successfully!`)
            }else{
                reject(`Data not found!`)
            }        
        }, 3000);
    })
}


fetchDataFromDatabase(data).then((message)=>console.log(message))
.catch((error)=>console.log(error))

console.log(`Fetching data from database...`)