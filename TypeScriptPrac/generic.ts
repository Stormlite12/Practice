function wrapValue<T>(value : T) : T[]{
    return [value];
}

console.log(wrapValue<number>(10));
console.log(wrapValue<string>("Hello"));

console.log(wrapValue({id :1, name : "Sid"}));