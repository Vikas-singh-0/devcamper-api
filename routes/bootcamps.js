const express = require('express');
const { getAllBootcamps, getOneBootcamp, updateOneBootcamp, deleteOneBootcamp, createNewBootcamp } = require('../controllers/bootcamps');

const router= express.Router();

router.route('/').
    get(getAllBootcamps).
    post(createNewBootcamp)

router.route('/:id').
    get(getOneBootcamp). 
    put(updateOneBootcamp).
    delete(deleteOneBootcamp)
    
module.exports = router;
