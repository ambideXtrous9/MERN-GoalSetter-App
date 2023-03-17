const asyncHandler = require('express-async-handler')

// @desc Get Goals
// @route GET /api/goals
// @access Private

// when we use mongoose to interact with the database, we get back a 'promise'
// so we need to use async-wait

// now if we use async-wait, in error handler we need to use try-catch. But to use
// .catch / ErrorHandler we have to use a package called Express Async Handler -> npm install
// and add it at top 
// and wrap entire async function with asyncHandler ==> now we will work with database

const getGoals = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : 'Get Goals'
    })
})

// @desc Set Goal
// @route POST /api/goals
// @access Private

const setGoals = asyncHandler( async (req,res) => {
    // error handler if body does not exist
    if(!req.body.text){
        res.status(400) //.json({message : "Please add a text field"}) use built-in error handler
        throw new Error('Please add a text field') // gives html error -> to get 
    }                                              // only error need to add errormiddleWare.js     
    

    res.status(200).json({
        message : 'Set Goals'
    })
})

// @desc Get Goals
// @route UPDATE /api/goals/:id
// @access Private

const updateGoal = asyncHandler( async (req,res) => {
    res.status(200).json({
        message : `Update Goals ${req.params.id}`
    })
})

// @desc Get Goals
// @route DELETE /api/goals/:id
// @access Private

const deleteGoal = asyncHandler( async (req,res) => {
    res.status(200).json({
        message : `Delete Goals ${req.params.id}`
    })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}