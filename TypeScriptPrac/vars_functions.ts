let username : string = "sid";
let age : number = 23;
let isActive : boolean = true;

function great(name : string) : string{
    return `hello ${name}`;
}

console.log(great(username));



let score : number = 95;

let isLoggedIn : boolean = true;

function formatUser(name : string , score: number) : string { 
    return `${name} score  : ${score}`;
}


console.log(formatUser(username, score));