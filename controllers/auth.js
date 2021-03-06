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

// @desc   Get logged in user profile
//@route    GET api/v1/auth/getme
//@access   Private
module.exports.getme = asyncHandler(async (req,res,next)=>{
    console.log(req.user);
    let u = await User.findById(req.user.id)
    res.json({
        success:true,
        data:u
    })
})


// @desc    Update logged in user profile
//@route    Put api/v1/auth/getme
//@access   Private
module.exports.updateme = asyncHandler(async (req,res,next)=>{
    // console.log(`${req.user}`.red.bold);

    const fieldsToUpdate ={
        email:req.body.email,
        name:req.body.name
    }

    // if(req.user.role !=='admin' && req.user.id!==req.params.id){
    //     return next(new errorResponse(404,"You cant updae the profile"))
    // }
    let u = await User.findByIdAndUpdate(req.user.id,fieldsToUpdate,{
        new:true,
        runValidators:true,
        
    })

    res.json({
        success:true,
        data:u
    })
})

module.exports.updatePassword = asyncHandler(async (req,res,next)=>{
    
    let user = await User.findById(req.user.id).select('+password')
    console.log(`${user.password} , ${req.body.currentpassword}`.green.bold);
    console.log(await bcrypt.compare(req.body.currentpassword,user.password));
    if(!await bcrypt.compare(req.body.currentpassword,user.password)){
        return next(new errorResponse(404,"wrong password"))
    }
    user.password = req.body.newpassword;
    await user.save()
    return res.status(200).json({
        success:true,
        message:"password changed success",
        user
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

