import React from 'react'

import {deleteGoal} from '../features/goals/goalSlice'
import {useDispatch} from 'react-redux'


// and it will be called in Dashboard.jsx

function GoalItem({goal}) { // destructures the goal that we got from DB 

  const dispatch = useDispatch()

  return (
    <div className='goals'>
        <div>
            {new Date(goal.createdAt).toDateString('en-US')}
        </div>
        <h2>{goal.text}</h2>
        {/* now here implement async thunk fnc in slice to del goal at backend*/}
        <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}> 
            X
        </button>
    </div>
  )
}

export default GoalItem


// after this add delete functionality to delete goals