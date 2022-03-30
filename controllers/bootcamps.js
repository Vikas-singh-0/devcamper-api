const asyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/bootcamp_model");
const errorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geoCoder");

// @desc    Get All Bootcamps
//@route    GET api/v1/bootcamps
//@access   Public
module.exports.getAllBootcamps =asyncHandler(async (req, res,next) => {
  return res.status(200).json(res.filterResults)
})

// @desc    Get One Bootcamp
//@route    GET api/v1/bootcamps/:id
//@access   Public
module.exports.getOneBootcamp =asyncHandler( async (req, res, next) => {
  
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({
      status: "success",
      data: bootcamp,
    });
});

// @desc    POST Create Bootcamp
//@route    POST api/v1/bootcamps
//@access   Private
module.exports.createNewBootcamp = asyncHandler(async (req, res,next) => {
    const bootcamp = await Bootcamp.create(req.body);

    return res.status(200).json({
      status: "success",
      data: bootcamp,
    });  
});

// @desc    Update one Bootcamp
//@route    PUT api/v1/bootcamps/:id
//@access   Private
module.exports.updateOneBootcamp =asyncHandler(async (req, res,next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({
      status: "success",
      data: bootcamp,
    });
});

// @desc    Delete one Bootcamps
//@route    DELETE api/v1/bootcamps/:id
//@access   Private
module.exports.deleteOneBootcamp = asyncHandler(async (req, res,next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({
      status: "success",
      data: bootcamp,
    });
});

// @desc    Get  Bootcamps within the radius
//@route    DELETE api/v1/bootcamps/radius/:zipcode/:distance
//@access   Private
module.exports.getBootcampsWithinRadius = asyncHandler(async (req, res,next) => {
  const {zipcode,distance}=req.params
  const loc = await geocoder.geocode(zipcode)
  // console.log(loc);
  const lat = loc[0].latitude
  const lon = loc[0].longitude 

  const radius = distance/3963

  const bootcamps = await Bootcamp.find({
    location:{$geoWithin:{$centerSphere:[[lat,lon],radius]}}
  });
  return res.status(200).json({
    status: "success",
    data: bootcamps,
    length:bootcamps.length
  });
});