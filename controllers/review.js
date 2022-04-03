const asyncHandler = require("../middlewares/async");
// const Reviews = require('../models/Review')
const errorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/bootcamp_model');
const Review = require("../models/Review");
//@desc     Get All reviews
//@route    Get api/v1/reviews
//@route    GET api/v1/bootcamps/:bootcampId/reviews
//@access   Public
module.exports.getReviews = asyncHandler(async (req,res,next)=>{
    let query ;
    console.log(req.params.bootcampId);
    if(req.params.bootcampId){
        query = Review.find({bootcamp:req.params.bootcampId})
    }
    else{
        query = Review.find().populate({
            path:'bootcamp',
            select:['name','description']
        });
    }
    const reviews = await query;

    res.status(200).json({
        success:true,
        count:reviews.length,
        data:reviews
    })
})

// @desc    Get One review
//@route    GET api/v1/reviews/:id
//@access   Public
module.exports.getReview = asyncHandler(async (req,res,next)=>{
    const review = await Review.findById(req.params.id).populate({
        path:'bootcamp',
        select:'name description'
    })
    if(!review){
        return next(new errorResponse(404,`No course with id ${req.params.id}`))
    }
    return res.status(200).json({
        success:true,
        data:review
    })
})

// @desc    Create new review
//@route    POST api/v1/bootcamps/:id/reviews
//@access   Private
module.exports.createReview = asyncHandler(async (req,res,next)=>{
    req.body.bootcamp = req.params.bootcampId
    req.body.user = req.user.id
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) {
        return next(new errorResponse(404,'the bootcamp does not exists'))
    }
    
    
    // if(bootcamp.user.toString()!==req.user.id && req.user.role !=="admin"){
    //     return next(new errorResponse(404,'User not authorised'))
    // }

    let review = await Review.create(req.body)

    return res.status(200).json({
        success:true,
        data:review
    })
})

// module.exports.updateCourse = asyncHandler(async (req,res,next)=>{
    
//     let course = await Course.findById(req.params.id)

//     if (!course) {
//         return next(errorResponse(404,"course not found"))
//     }
//     if(course.user.toString()!==req.user.id && req.user.role !=="admin"){
//         return next(new errorResponse(404,'User not authorised'))
//     }

//     course = await Course.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,
//         runValidators:true
//     })
  
//     return res.status(200).json({
//         success:true,
//         data:course
//     })
// })


// module.exports.deleteCourse = asyncHandler(async (req,res,next)=>{
    
//     let course = await Course.findById(req.params.id)

//     if (!course) {
//         return next(errorResponse(404,"course not found"))
//     }

//     if(course.user.toString()!==req.user.id && req.user.role !=="admin"){
//         return next(new errorResponse(404,'User not authorised'))
//     }

//     course = await Course.findByIdAndDelete(req.params.id)
  
//     return res.status(200).json({
//         success:true,
//         data:course
//     })
// })
