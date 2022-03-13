// @desc    Get All Bootcamps
//@route    GET api/v1/bootcamps
//@access   Public
module.exports.getAllBootcamps = ((req,res)=>{
    return res.status(200).json({
      status:"success",
      data:"all bootcamps",
     
    })
})

// @desc    Get One Bootcamp
//@route    GET api/v1/bootcamps/:id
//@access   Public
module.exports.getOneBootcamp = ((req,res)=>{
    return res.status(200).json({
      status:"success",
      data:"one bootcamps"
    })
})

// @desc    POST Create Bootcamp
//@route    POST api/v1/bootcamps
//@access   Private
module.exports.createNewBootcamp=((req,res)=>{
    return res.status(200).json({
      status:"success",
      data:"new bootcamp"
    })
})

// @desc    Update one Bootcamp
//@route    PUT api/v1/bootcamps/:id
//@access   Private
module.exports.updateOneBootcamp =((req,res)=>{
    return res.status(200).json({
      status:"success",
      data:"update bootcamps"
    })
})

// @desc    Delete one Bootcamps
//@route    DELETE api/v1/bootcamps/:id
//@access   Private
module.exports.deleteOneBootcamp=((req,res)=>{
    return res.status(200).json({
      status:"success",
      data:"deleted bootcamps"
    })
})
