// custom error handler

const errorHandler = (err,req,res,next) => { // overiding default error handler
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack // stack trace
    })
} 

module.exports = {  // call it in server.js
    errorHandler
}