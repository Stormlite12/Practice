function myReduce(array,callback,init_val){
    let accumulator = init_val!==undefined ? init_val : array[0];
    let start_idx = init_val!==undefined? 0 :1 ;

    for(let i=start_idx;i<array.length;i++){
        accumulator = callback(accumulator,array[i],i,array);
    }

    return accumulator;
}


function myMap_v2(array,callback){
    return myReduce(array, (acc,val,i,arr) =>{
        let transformedValue=callback(val,i,arr);
        acc.push(transformedValue);
        return acc;
    },[]);
}

function myFilter_v2(array,callback){
    return myReduce(array,(res,val,i,arr) =>{
        if(callback(val,i,arr)){
            res.push(val);
        }
        return res;
    },[])
}

let arr = [1, 3, 5];
console.log("map_v2 :", myMap_v2(arr,x=>x*2));
console.log("filter_v2 :", myFilter_v2(arr, x=>x>2));


