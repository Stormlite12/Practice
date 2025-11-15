const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/response");
require('dotenv').config();


module.exports = (req,res,next)=>{
        const header = req.headers.authorization;
        if(!header) return sendError(res,"No token",401);
    
        const token = header.split(" ")[1];
        if(!token) return sendError(res,"Invalid format",401)
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return sendError(res,"Invalid or expired Token",403)
    }
};