import React from 'react'

// and it will be called in Dashboard.jsx

function GoalItem({goal}) { // destructures the goal that we got from DB 
  return (
    <div className='goals'>
        <div>
            {new Date(goal.createdAt).toDateString('en-US')}
        </div>
        <h2>{goal.text}</h2>
    </div>
  )
}

export default GoalItem