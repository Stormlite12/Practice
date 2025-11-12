// const p = new Promise((resolve,reject)=>{
//     setTimeout(()=> resolve(1),1000);
// }).then(num =>{
//     console.log("Step 1:" , num);
//     return num*2;
// }).then(num =>{
//     console.log("Step 2: ",num);
//     return num*3;
// }).then(num =>{
//     console.log("Step 3: ", num);
// })

// console.log(p);
// p.then(result=> console.log(result));


// const p2= new Promise((resolve,reject)=>{
//     setTimeout(()=> reject("Error Occured"),1000);
// })
// .then(()=>console.log("Never Runs"))
// .catch(err=>console.log("Caught",err));


// const a = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//        console.log("A is working");
//        resolve("A is done");
//     },1000)
// })

// const b = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       console.log("B is working");
//       resolve("B is done");
//     },2000)
// })


// Promise.all([a,b]).then(results => console.log(results));


// function delay(ms,value){
//     return new Promise((resolve) =>{
//         setTimeout(()=>{
//              console.log("First Delay");
//             resolve(value);
//         },ms)
//     }).then(value =>{
//         return new Promise((resolve)=>{ 
//             setTimeout(()=>{
//                 console.log("Second Delay");
//                 resolve(value);
//             },1000);
//         })
//     }).then(value =>{
//         return new Promise((resolve) =>{
//             setTimeout(()=>{
//                 console.log("Third Delay");
//                 console.log(value);
//                 resolve(value);
//             },1000);
//         })
//     })
// }

// delay(3000,"Eggs");




// async function delay() {
//     await new Promise((resolve)=>{
//          setTimeout(()=>{
//             console.log("First Delay");
//             resolve();
//          },1000)
//     }) 

//     await new Promise((resolve)=>{
//         setTimeout(()=>{
//             console.log("Second Delay");
//             resolve();
//         },2000)
//     })
// }

// async function runParallel(){
//     console.log("Starting in parallel");

//     const results = await Promise.all([
//         new Promise((resolve)=>{
//          setTimeout(()=>{
//             console.log("First Delay");
//             resolve("First Done");
//          },1000)
//         }), 

//         new Promise((resolve)=>{
//         setTimeout(()=>{
//             console.log("Second Delay");
//             resolve("Second Done");
//         },2000)
//         })
//     ])

//     console.log("All done",results);
// }

// runParallel();


function delaying(ms, shouldFail = false){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            if(shouldFail){
                 res("Done Delaying");
            }
            else{
                rej("Delay failed");
            }
        },ms);
    });
}

async function run(){
    try{
         const result=await delaying(2000,true);
        console.log(result);    
    }
    catch(err){
        console.log("Couldn't delay :",err);
    }
   
}

run();
