const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

// it will be sent as header
// in HTTP header we have auth object -> req.headers.authorization
const protect = asyncHandler(async(req,res,next) => { // ,next as middleware fnc
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try { 
            // token like -> Bearer afkahsfhioahfiosafdi 
            token = req.headers.authorization.split(' ')[1] // gives only token

            // verify token
            //The client must send a JWT token in the Authorization header of the HTTP request. 
            //We extract the token from the header and verify it using the jwt.verify method.
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // If the verification is successful, we add the decoded token to the req.user object 
            // and call the next() function to continue processing the request.
            // get user from the token -> payload token contains
            // the id -> function generateToken
            req.user = await User.findById(decoded.id).select('-password') // ignore the password hash

            next() //at end, this middleware is called to execute next piece of middleware

        } 
        catch (error) 
        {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token)
    {
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
    

})


module.exports = {protect}