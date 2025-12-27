

function myMap(array,callback){
    const result = [];
    for(let i=0;i<array.length;i++){
        result.push(callback(array[i],i,array));
    }
    return result;
}


function myFilter(array,callback){
    const result= [];
    for(let i=0; i<array.length;i++){
            if(callback(array[i],i,array)){
                  result.push(array[i]);
            }
    }
    return result;
}

function myReduce(array,callback,init_val){
    let accumulator = init_val !== undefined ? init_val : array[0]; 
    let start_idx =  init_val !== undefined ? 0 : 1;

    for(let i=start_idx;i<array.length;i++){
        accumulator = callback(accumulator, array[i],i,array);
    }

    return accumulator;
}

let arr=[1,3,5];

// console.log("map: ", myMap(arr,(x,i)=>i));
// console.log("filter: ",myFilter(arr,x=>x>1));
// console.log("sum: ", myReduce(arr,(acc,val)=>acc+val,0));

console.log("map:", myMap(arr, x => x * 2));
console.log("filter:", myFilter(arr, x => x > 2));
console.log("reduce:", myReduce(arr, (acc, val) => acc + val, 0));
