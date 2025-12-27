let a = [2,4,5];
let b = "hawa";


function hawaHawai(b){
    console.log("Hello "+b);
}
hawaHawai(b);


const chotiHawa = (b="behti hawa",...nums) =>{
    console.log(b);
    console.log(nums.reduce((acc,v)=>acc+=v,0))
}


chotiHawa(b,2,4,5);