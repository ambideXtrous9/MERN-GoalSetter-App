const express = require('express') // equivalent to import

const router = express.Router()

const {getGoals,setGoals,updateGoal,deleteGoal} = require('../controllers/goalController')


const {protect} = require('../middleware/authMiddleware')

// router.get('/', getGoals)
// router.post('/', setGoals)

// to protect every route just add 'protect' before it -> get(protect,getGoals)

router.route('/').get(protect,getGoals).post(protect,setGoals)

// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)


module.exports = router