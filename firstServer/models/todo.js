const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        required : false,
        default : false
    }
});

module.exports = mongoose.model("Todo",todoSchema);




// const mongoose = require("mongoose");

// const todoSchema = new mongoose.Schema({
//     title :{
//         type : String,
//         required : true,
//     }
// });

// module.exports = mongoose.model("Todo", todoSchema);



// const mongoose = required('mongoose');

// const todoSchema = new mongoose.Schema({

//     title :{
//         type : String,
//         required: true
//     },
//     completed :{
//         type : Boolean,
//         required : false,
//         default : false
//     } 
// });

// module.exports = mongoose.model("Todo", todoSchema);




// const mongoose = require("mongoose");


// const todoSchema = new mongoose.Schema({
//     title :{
//         type: String,
//         required : true,
//         trim : true
//     },
//     completed :{
//         type :  Boolean,
//         required : false,
//         default : false
//     }
// })


// module.exports = mongoose.model("Todo", todoSchema);