function printId(id : string | number) : void{
    if(typeof(id) === "string"){
        console.log(id.toUpperCase());
    }
    else{
        console.log(id.toFixed());
    }
}

printId(10);
printId("abc123");