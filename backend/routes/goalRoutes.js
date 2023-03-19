const express = require('express') // equivalent to import

const router = express.Router()

const {getGoals,setGoals,updateGoal,deleteGoal} = require('../controllers/goalController')


const {protect} = require('../middleware/authMiddleware')

// router.get('/', getGoals)
// router.post('/', setGoals)

// to protect every route just add 'protect' before it -> get(protect,getGoals)

// We pass the authMiddleware function (prtotect here) as a second argument to the app.get() 
// method before the route handler function. This ensures that the middleware 
// function is called before the route handler and that the req.user object is available in the route handler.


router.route('/').get(protect,getGoals).post(protect,setGoals)

// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)


module.exports = router