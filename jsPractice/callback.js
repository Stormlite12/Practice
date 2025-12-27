// console.log("Start");

// setTimeout(()=>{
//     console.log("Task done after 2s");
// },2000);

// console.log("End");


console.log("Start");

setTimeout(()=>{
    console.log("Step 1");
    setTimeout(()=>{
        console.log("Step 2");
        setTimeout(()=>{
            console.log("Step 3");
        },1000);
    },1000);
},1000);

console.log("End");
