const express = require('express');
const {sendError, sendSuccess} = require('../utils/response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');


require('dotenv').config();


//register
router.post('/register',async(req,res)=>{
    try{
        const {username, password} = req.body;

        const hash = await bcrypt.hash(password,10);

        const user = await User.create({username , password : hash});

        return sendSuccess(res,{id : user._id,
            username : user.username
        });
    }
    catch(err){
        return sendError(res,"Server Error",500);
    }
})



//login
router.post('/login',async(req,res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user) return sendError(res,"Invalid Credentials",400);

        const match = await bcrypt.compare(password, user.password);
        
        if(!match) return sendError(res,"Invalid Credentials",400);

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET,{expiresIn : "1d"});

        sendSuccess(res,{token});

    }catch(err){
        console.log("Error");
        return sendError(res,"Server Error",500);
    }
})


module.exports = router;