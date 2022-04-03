const express = require('express');
const { getAllBootcamps, getOneBootcamp, updateOneBootcamp, deleteOneBootcamp, createNewBootcamp, getBootcampsWithinRadius } = require('../controllers/bootcamps');
const { protect,authorize } = require('../middlewares/auth');
const geocoder = require('../utils/geoCoder');
const Courses = require('./courses');
const reviewRouter = require('./review');

const router= express.Router();

router.route('/radius/:zipcode/:distance').
    get(getBootcampsWithinRadius)

router.route('/').
    get(protect,getAllBootcamps).
    post(protect,authorize('publisher','admin'),createNewBootcamp)

router.route('/:id').
    get(getOneBootcamp). 
    put(protect, authorize('publisher','admin'),updateOneBootcamp).
    delete(protect,authorize('publisher','admin'), deleteOneBootcamp)

//re-route
router.use('/:bootcampId/courses',Courses)
router.use('/:bootcampId/reviews',reviewRouter)


module.exports = router;
