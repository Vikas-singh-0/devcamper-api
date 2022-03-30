const express = require('express');
const { getAllBootcamps, getOneBootcamp, updateOneBootcamp, deleteOneBootcamp, createNewBootcamp, getBootcampsWithinRadius } = require('../controllers/bootcamps');
const filterMiddleware = require('../middlewares/filterResults');
const bootcamp_model = require('../models/bootcamp_model');
const geocoder = require('../utils/geoCoder');
const Courses = require('./courses')

const router= express.Router();

router.route('/radius/:zipcode/:distance').
    get(getBootcampsWithinRadius)

router.route('/').
    get(filterMiddleware(bootcamp_model,'courses'),getAllBootcamps).
    post(createNewBootcamp)

router.route('/:id').
    get(getOneBootcamp). 
    put(updateOneBootcamp).
    delete(deleteOneBootcamp)

//re-route
router.use('/:bootcampId/courses',Courses)


module.exports = router;
