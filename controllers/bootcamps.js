const asyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/bootcamp_model");
const errorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geoCoder");

// @desc    Get All Bootcamps
//@route    GET api/v1/bootcamps
//@access   Public
module.exports.getAllBootcamps =asyncHandler(async (req, res,next) => {
  let queryStr = {...req.query};
  // console.log("query : *************",queryStr);
  let removeFields = ['select','sort','page','limit']

  removeFields.forEach(i=>delete queryStr[i])

  queryStr = JSON.stringify(queryStr);
  queryStr = queryStr.replace(/\b(gt|lte|gte|lt|in)\b/g,match=>`$${match}`)

  let query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  if(req.query.select){
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields) 
  }

  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ')
    query=query.sort(sortBy)
  }else{
    query=query.sort('-createdAt')
  }

  //pagination
  const page = parseInt(req.query.page,10)||1;
  const limit = parseInt(req.query.limit,10)||10;
  const staartIndex = (page-1)*limit;
  const endIndex = page*limit;
  const total = await Bootcamp.countDocuments();
  const pagination ={}

  console.log(page,limit,staartIndex,endIndex,total);

  if(endIndex<total){
    pagination.next={
      page:page+1,
      limit
    }
  }
  if(staartIndex>0){
    pagination.prev={
      page:page-1,
      limit
    }
  }

  query = query.skip(staartIndex).limit(limit)

  // console.log(query);
  
  const bootcamps = await query;
  
  return res
    .status(200)
    .json({
        status: "success",
        pagination,
        count: bootcamps.length,
        data: bootcamps 
  });
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