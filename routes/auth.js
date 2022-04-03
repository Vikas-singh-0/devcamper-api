const express = require('express')
const { register, login, getme, updateme, updatePassword, logout } = require('../controllers/auth')
const { protect } = require('../middlewares/auth')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',protect,getme)
router.put('/updateme',protect,updateme)
router.put('/updatepassword',protect,updatePassword)

module.exports = router;