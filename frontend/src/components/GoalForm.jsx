import React from 'react'

import {useState} from 'react'
import {useDispatch} from 'react-redux'

import {createGoal} from '../features/goals/goalSlice' 


function GoalForm() {

     // text and function to update piece of state setText
     // useState takes empty string default
    const [text,setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        // dispatch a function createGoal in goalSlice
        dispatch(createGoal({text}))
        setText('')

    }


  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">
                    Goal
                </label>
                {/*we add piece of state for this form */}
                <input type="text" name='text' id='text' value=
                {text} onChange={(e) => setText(e.target.value)}/>  
                {/*now we need a submit button, so add after div*/}
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>Add Goal</button>
                {/*once we submit this, we need to dispatch a thunk function
                from slice/redux */}
            </div>
        </form>
    </section>
  )
}

export default GoalForm

// save this and import it in Dashboard.jsx