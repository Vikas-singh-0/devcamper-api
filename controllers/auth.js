const asyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/bootcamp_model");
const User = require("../models/user");
const errorResponse = require("../utils/errorResponse");
const bcrypt = require('bcrypt');

// @desc    Register user
//@route    GET api/v1/auth/register
//@access   Public
module.exports.register= asyncHandler(async (req,res,next)=>{

    let {name,email,password,role}=req.body;
    const salt = await bcrypt.genSalt(10) 
    password = await bcrypt.hash(password,salt)
    const u = await User.create({name,email,password,role})
    sendTokenResponse(u,200,res)
})

// @desc    Login user
//@route    GET api/v1/auth/login
//@access   Public
module.exports.login = asyncHandler(async (req,res,next)=>{
    
    let {email,password}=req.body;
    if(!email || !password){
        return next(new errorResponse(404,"Please enter email and pass"))
    }
    const u = await User.findOne({email}).select('+password') 
    
    if(!u){
        return next(new errorResponse(401,"User not found"))
    }
    const result = await bcrypt.compare(password,u.password)
    
    if(!result){
        return next(new errorResponse(404,"Invalid credentials"))
    }
    sendTokenResponse(u,200,res)
    
})

module.exports.getme = asyncHandler(async (req,res,next)=>{
    console.log(req.user);
    let u = await User.findById(req.user.id)
    res.json({
        success:true,
        data:u
    })
})

const sendTokenResponse = (user,statusCode ,res) =>{
    const token = user.getSignedJwtToken();
    const options = {
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true
    }
    if(process.env.NODE_ENV==="production"){
        options.secure =true
    }
    res.
        status(statusCode).
        cookie('token',token,options).
        json({
            success:true,
            token
        })
}
