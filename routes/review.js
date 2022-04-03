const express = require('express')
const { getReviews, createReview, getReview } = require('../controllers/review')
const { protect,authorize } = require('../middlewares/auth')

const reviewRouter = express.Router({mergeParams:true})

reviewRouter.route('/').
    get(getReviews).
    post(protect,authorize('publisher','admin','user'),createReview)
reviewRouter.route('/:id').
    get(getReview)
    // put(protect,authorize('publisher','admin'),updateCourse).
    // delete(protect,authorize('publisher','admin'),deleteCourse)

module.exports = reviewRouter;