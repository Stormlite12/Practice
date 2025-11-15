const todosRouter = require("./routes/todos");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler")
const validation = require("./middleware/validateTools")
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const authMid = require("./middleware/auth");



const express = require('express');
require("dotenv").config();


const app = express();

const PORT=  process.env.PORT || 3000;

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDb connected")
})
.catch((err)=>{
    console.error("Connection Error: ", err);
})


app.get('/',(req,res)=>{
    res.send("Server is running")}
);
app.use(logger);
app.use('/auth',auth);
app.use('/todos',validation,authMid,todosRouter)     
app.use(errorHandler);


async function startServer() {
      app.listen(PORT,()=>{
      console.log(`Server is running on ${PORT}`);
})
}

startServer();



