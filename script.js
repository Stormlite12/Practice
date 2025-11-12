const fs = require("fs").promises;

async function getData(){
    try{
        const response= await fetch("https://jsonplaceholder.typicode.com/todos/1");
        if(!response.ok) throw new Error(`HTTP ${response.status}`);
        const data= await response.json();
        
        await fs.writeFile("Script.txt",JSON.stringify(data, null,2) + "\n");
        console.log("File Written");

        const logs= await fs.readFile("Script.txt","utf8");
        console.log("File Content:\n",logs);
    }
    catch(err){
        console.log("Failed to fetch Data",err);
    }
}

getData();