const jwt = require('jsonwebtoken')
const asyncHandler = require('./async');
const errorHandler = require('../utils/errorResponse');
const User = require('../models/user');

exports.protect = asyncHandler(async (req,res,next)=>{
    let token ;


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        token=req.headers.authorization.split(" ")[1]
        
    }
    // else if(req.cookies.token){
    //     token = req.token.cookies
    // }

    if(!token){
        return next(new errorHandler(404,"Uesr Not authorised"))
    }

    // verify token
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        // console.log(decoded);

        req.user = await User.findById(decoded._id)
        // console.log(req.user);
        next()
        
    } catch (error) {
        return next(new errorHandler(404,"Not authorised")) 
    }
})

exports.authorize=(...roles)=>{
    return ((req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new errorHandler(403,"User role not  authorised"))
        }
        next()
    })
}