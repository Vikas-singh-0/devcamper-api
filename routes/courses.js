const express = require('express')
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courses')

const coursesRouter = express.Router({mergeParams:true})

coursesRouter.route('/').
    get(getCourses).
    post(createCourse)
coursesRouter.route('/:id').
    get(getCourse).
    put(updateCourse).
    delete(deleteCourse)

module.exports = coursesRouter;