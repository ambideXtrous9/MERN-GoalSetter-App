const express = require('express') // equivalent to import

const router = express.Router()

const {registerUser,loginUser,getUser} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(registerUser)
router.route('/login').post(loginUser)

// use protect here
// in postman : Auth -> Bearer Token -> paste token
router.route('/me').get(protect,getUser)


module.exports = router