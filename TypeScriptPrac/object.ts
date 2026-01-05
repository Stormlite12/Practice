type User = {
    id : number,
    name : string,
    email? : string
};

const user1 : User = {
    id:1,
    name:'Sid'
}

const user2 : User = {
    id:2,
    name: 'Ani',
    email : "Anisoccer"
}


console.log(user1, user2);