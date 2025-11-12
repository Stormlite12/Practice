async function getData(){
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        if(!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log("Fetched:",data);
    }
    catch(err){
        console.log("Failed to fetch data:",err);
    }

}

getData();