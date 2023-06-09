const asyncHandler = require('express-async-handler')


const Goal = require('../model/goalModel')
const User = require('../model/userModel') // used in update and delete

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
    
    // const goals = await Goal.find() // showing all goals
    // get specific users goal
    const goals = await Goal.find({user : req.user.id}) // user field in Goal from goalModel
                                                        // req.user.id from protect middleware                    
    
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
    
    const goal = await Goal.create({  // Goal.create add entry to db
        text : req.body.text,         // and Goal is actually schema defined defined in goalModel
        user : req.user.id            // will get this field from protect middleware used 
    })                                // in goalRoutes  

    res.status(200).json(
        goal
        //{message : 'Set Goals'}
    )
})

// @desc Get Goals
// @route UPDATE /api/goals/:id
// @access Private

const updateGoal = asyncHandler( async (req,res) => {

    // find goal by user input email and id
    const goal = await Goal.findById(req.params.id)

    
    if(!goal)
    {
        res.status(400)
        throw new Error('Goal Not Found')
    }

    // make sure goal is associated to particular user only
    // and one user can not delete or update other user's entry or data 
    // getting user from header auth token

    // we already have got our user, from the in authMiddleware -> req.user
    // so no need it fetch it again, instead we can directly use req.user
    // const {id,name,email} = await User.findById(req.user.id) // from token authMiddleware.js

    // const user = await User.findById(req.user.id)

    if(!req.user)
    {
        res.status(401)
        throw new Error('User Not Found !!')
    }

    // make sure login user matches the goal user
    if(goal.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error('User Not Authorized')
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

    // we already have got our user, from the in authMiddleware -> req.user
    // so no need it fetch it again, instead we can directly use req.user
    // const {id,name,email} = await User.findById(req.user.id) // from token authMiddleware.js


    //const user = await User.findById(req.user.id)

    if(!req.user)
    {
        res.status(401)
        throw new Error('User Not Found !!')
    }

    // make sure login user matches the goal user
    if(goal.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error('User Not Authorized')
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