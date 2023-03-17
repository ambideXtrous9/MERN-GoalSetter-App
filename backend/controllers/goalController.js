const asyncHandler = require('express-async-handler')


const Goal = require('../model/goalModel')
// @desc Get Goals
// @route GET /api/goals
// @access Private

// when we use mongoose to interact with the database, we get back a 'promise'
// so we need to use async-wait

// now if we use async-wait, in error handler we need to use try-catch. But to use
// .catch / ErrorHandler we have to use a package called Express Async Handler -> npm install
// and add it at top 
// and wrap entire async function with asyncHandler ==> now we will work with database

// install mongodb compass .then go to  mongodb site, atlas login and create DB, add username & password
// and add ip and create the cluster.



const getGoals = asyncHandler(async (req,res) => {
    
    const goals = await Goal.find()
    
    
    
    res.status(200).json(
        //{message : 'Get Goals'}
        goals
    )
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
    
    const goal = await Goal.create({
        text : req.body.text,
    })

    res.status(200).json(
        goal
        //{message : 'Set Goals'}
    )
})

// @desc Get Goals
// @route UPDATE /api/goals/:id
// @access Private

const updateGoal = asyncHandler( async (req,res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal)
    {
        res.status(400)
        throw new Error('Goal Not Found')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id,
        req.body,{
            new : true
        })

    res.status(200).json(
        updateGoal
        //{message : `Update Goals ${req.params.id}`}
    )
})

// @desc Get Goals
// @route DELETE /api/goals/:id
// @access Private

const deleteGoal = asyncHandler( async (req,res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal)
    {
        res.status(400)
        throw new Error('Goal Not Found')
    }

    await goal.remove()

    res.status(200).json(
        {id : req.params.id}
        //{message : `Delete Goals ${req.params.id}`}
        )
})

module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}