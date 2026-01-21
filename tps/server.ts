type user ={
    name: string
}


function isUser(value : unknown) : value is user {

    return ( typeof value === "object" && value!==null && "name" in value)
  
}


const data : unknown = {name : "Sid"};

if(isUser(data)){
    console.log(data.name)
}