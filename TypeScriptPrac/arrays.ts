const scores : number[] = [10,20,30];

const doubled = scores.map((num) :number =>{
    return num*2;
})

console.log(doubled);


const tripled : number[] = scores.map((num): number =>{
    return num*3;
})

console.log(tripled);