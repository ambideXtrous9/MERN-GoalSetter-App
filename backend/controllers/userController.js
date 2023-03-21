const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/userModel')


// Generate JWT token
// id -> user id as payload
// this is used to encrypt user id
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : '30d', // expires in 30 days
    })
}

// @desc Register new users
// @route POST /api/users
// @access Public -> as login page

const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body

    if(!(name && email && password))
    {
        res.status(400)
        throw new Error('Please Fill up required fields')
    }

    // find use by email id already present in db then throw error
    const userExists  = await User.findOne({email})

    if(userExists)
    {
        res.status(400)
        throw new Error('User already Exist')
    }

    // now hash the password -> first we need salt from bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPWD = await bcrypt.hash(password,salt)

    // Create user
    const user = await User.create({
        name : name,
        email : email,
        password : hashedPWD
    })

    if(user){
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            // add token as well
            token : generateToken(user._id)
        })
    }
    else
    {
        res.status(400)
        throw new Error('Cannot create user')
    }
})

// @desc Authenticate a user
// @route GET /api/users/login
// @access Public -> as login page

const loginUser = asyncHandler(async (req,res) => {

    // get email,password from the user
    const {email,password} = req.body

    // find by that email in DB
    const user = await User.findOne({email})

    //check user exist && password matches with hashed password
    if(user && (await bcrypt.compare(password,user.password)))
    {
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }
    else
    {
        res.status(400)
        throw new Error('User does not Exist !! or Wrong Credentials')
    }
})

// @desc show user
// @route GET /api/users/me
// @access Private

// protect routes -> using middleware (custom)
// middleware function runs during request-response cycle
// when we send a request to a route, this function runs and check the token
// authMiddleware will be added in middleware folder
const getUser = asyncHandler(async (req,res) => {
    
    // we already have got our user, from the in authMiddleware -> req.user
    // so no need it fetch it again, instead we can directly use req.user
    // const {id,name,email} = await User.findById(req.user.id) // from token authMiddleware.js

    // res.status(200).json({
    //     id : id,
    //     name,
    //     email
    // })

    // change same in the goalController.js as well

    res.status(200).json(req.user)

})



module.exports = {
    registerUser,
    loginUser,
    getUser
}
