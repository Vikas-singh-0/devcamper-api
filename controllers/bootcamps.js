const Bootcamp = require('../models/bootcamp_model')

// @desc    Get All Bootcamps
//@route    GET api/v1/bootcamps
//@access   Public
module.exports.getAllBootcamps = async (req,res)=>{
  try {
    const bootcamps = await Bootcamp.find({})
    return res.status(200).json({status:"success",data:bootcamps,})
  } catch (error) {
    return res.status(400).json({status:"failed",error:error.message})
  }
}

// @desc    Get One Bootcamp
//@route    GET api/v1/bootcamps/:id
//@access   Public
module.exports.getOneBootcamp = async (req,res)=>{
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp){
      return res.status(400).json({success:false})
    }
    return res.status(200).json({
      status:"success",
      data:bootcamp,
    })
  } catch (error) {
    return res.status(400).json({
      status:"failed",
      error:error.message
    })
  }
}

// @desc    POST Create Bootcamp
//@route    POST api/v1/bootcamps
//@access   Private
module.exports.createNewBootcamp=async (req,res)=>{
    try {
      const bootcamp = await Bootcamp.create(req.body)
      
      return res.status(200).json({
        status:"success",
        data:bootcamp,
      })
    } catch (error) {
      return res.status(400).json({
        status:"failed",
        error:error.message
      })
    }
}

// @desc    Update one Bootcamp
//@route    PUT api/v1/bootcamps/:id
//@access   Private
module.exports.updateOneBootcamp =async (req,res)=>{
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    })
    if(!bootcamp){
      return res.status(400).json({success:false})
    }
    return res.status(200).json({
      status:"success",
      data:bootcamp,
    })
  } catch (error) {
    return res.status(400).json({
      status:"failed",
      error:error.message
    })
  }
}

// @desc    Delete one Bootcamps
//@route    DELETE api/v1/bootcamps/:id
//@access   Private
module.exports.deleteOneBootcamp=async (req,res)=>{
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp){
      return res.status(400).json({success:false})
    }
    return res.status(200).json({
      status:"success",
      data:bootcamp,
    })
  } catch (error) {
    return res.status(400).json({
      status:"failed",
      error:error.message
    })
  }
}
