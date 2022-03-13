const Bootcamp = require("../models/bootcamp_model");
const errorResponse = require("../utils/errorResponse");

// @desc    Get All Bootcamps
//@route    GET api/v1/bootcamps
//@access   Public
module.exports.getAllBootcamps = async (req, res,next) => {
  try {
    const bootcamps = await Bootcamp.find({});
    return res
      .status(200)
      .json({
         status: "success",
         count: bootcamps.length,
         data: bootcamps 
      });
  } catch (error) {
    next(error)
  }
};

// @desc    Get One Bootcamp
//@route    GET api/v1/bootcamps/:id
//@access   Public
module.exports.getOneBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({
      status: "success",
      data: bootcamp,
    });
  } catch (error) {
    next(error)
  }
};

// @desc    POST Create Bootcamp
//@route    POST api/v1/bootcamps
//@access   Private
module.exports.createNewBootcamp = async (req, res,next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    return res.status(200).json({
      status: "success",
      data: bootcamp,
    });
  } catch (error) {
    next(error)
  }
};

// @desc    Update one Bootcamp
//@route    PUT api/v1/bootcamps/:id
//@access   Private
module.exports.updateOneBootcamp = async (req, res,next) => {
  try {
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
  } catch (error) {
    next(error)
  }
};

// @desc    Delete one Bootcamps
//@route    DELETE api/v1/bootcamps/:id
//@access   Private
module.exports.deleteOneBootcamp = async (req, res,next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({
      status: "success",
      data: bootcamp,
    });
  } catch (error) {
    next(error)
  }
};
