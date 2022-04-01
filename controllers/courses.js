const asyncHandler = require("../middlewares/async");
const Course = require('../models/course_model')
const errorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/bootcamp_model')
// @desc    Get All courses
//@route    GET api/v1/bootcamps/:bootcampId/courses
//@route    GET api/v1/courses
//@access   Public
module.exports.getCourses = asyncHandler(async (req,res,next)=>{
    let query ;
    console.log(req.params.bootcampId);
    if(req.params.bootcampId){
        query = Course.find({bootcamp:req.params.bootcampId})
    }
    else{
        query = Course.find().populate({
            path:'bootcamp',
            select:['name','description']
        });
    }
    const courses = await query;

    res.status(200).json({
        success:true,
        count:courses.length,
        data:courses
    })
})

// @desc    Get One courses
//@route    GET api/v1/courses/:id
//@access   Public
module.exports.getCourse = asyncHandler(async (req,res,next)=>{
    const course = await Course.findById(req.params.id).populate({
        path:'bootcamp',
        select:'name description'
    })
    if(!course){
        return next(new errorResponse(404,`No course with id ${req.params.id}`))
    }
    return res.status(200).json({
        success:true,
        data:course
    })
})

// @desc    Create new course
//@route    POST api/v1/bootcamps/:id/courses
//@access   Private
module.exports.createCourse = asyncHandler(async (req,res,next)=>{
    req.body.id= req.params.id
    req.body.user = req.user.id
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) {
        return next(new errorResponse(404,'the bootcamp does not exists'))
    }
    
    
    if(bootcamp.user.toString()!==req.user.id && req.user.role !=="admin"){
        return next(new errorResponse(404,'User not authorised'))
    }

    let course = await Course.create(req.body)

    return res.status(200).json({
        success:true,
        data:course
    })
})

module.exports.updateCourse = asyncHandler(async (req,res,next)=>{
    
    let course = await Course.findById(req.params.id)

    if (!course) {
        return next(errorResponse(404,"course not found"))
    }
    if(course.user.toString()!==req.user.id && req.user.role !=="admin"){
        return next(new errorResponse(404,'User not authorised'))
    }

    course = await Course.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
  
    return res.status(200).json({
        success:true,
        data:course
    })
})


module.exports.deleteCourse = asyncHandler(async (req,res,next)=>{
    
    let course = await Course.findById(req.params.id)

    if (!course) {
        return next(errorResponse(404,"course not found"))
    }

    if(course.user.toString()!==req.user.id && req.user.role !=="admin"){
        return next(new errorResponse(404,'User not authorised'))
    }

    course = await Course.findByIdAndDelete(req.params.id)
  
    return res.status(200).json({
        success:true,
        data:course
    })
})
