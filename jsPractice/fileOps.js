const fs = require("fs").promises;

async function fileFlow(){
    try{
        await fs.writeFile("data.txt","Learning async JS\n");
        console.log("File Written");

        const content = await fs.readFile("data.txt","utf8");
        console.log("File Content:",content);

        await fs.appendFile("data.txt","Appending success\n");
        console.log("File Appended");
    }
    catch(err){
        console.log("File error", err);
    }
}

fileFlow();
