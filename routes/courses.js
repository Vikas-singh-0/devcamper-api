const express = require('express')
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courses')
const { protect,authorize } = require('../middlewares/auth')

const coursesRouter = express.Router({mergeParams:true})

coursesRouter.route('/').
    get(getCourses).
    post(protect,authorize('publisher','admin'),createCourse)
coursesRouter.route('/:id').
    get(getCourse).
    put(protect,authorize('publisher','admin'),updateCourse).
    delete(protect,authorize('publisher','admin'),deleteCourse)

module.exports = coursesRouter;