// add vs code extension ES7+ React/Redux
// type rfce -> it will add the function snippet reactFunctionalExportComponent
// do the same for Login and Register

import React from 'react'

import {useEffect} from 'react'

// useSelector to select something from the state
// i.e bring in user - isSuccess, isLoading or isError
// useDispatch - we want a dispatch a function like register, or async thunk fnc
// or reset then we use this
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import GoalForm from '../components/GoalForm' // put it right below the section
import Spinner from '../components/Spinner'
import { getGoals } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'

import { reset } from '../features/auth/authSlice'


function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useSelector takes a function, and argument to the function is state
  const {user} = useSelector((state) => state.auth)

  // now same way we get goals part
  // from the backend, data will appear here
  const {goals,isLoading, isError, message} = useSelector((state) => state.goals) // now add to useEffect

  // useEffect takes a function, and dependency array
  useEffect(() => {
    if(isError){
      console.log(message);
    }

    if(!user){
      navigate('/login')
    }
    
    // dispatch getGoals here
    dispatch(getGoals())
    

    
    // reset the state on unmount , means leave dashboard
    // if we want to do something when component unmounts,
    // then just return from useEffect

    // *** this reset() must be from authSlice not from goalSlice ***
    return () => {    
      dispatch(reset())
    }

  },[user,navigate, /*add rest dependecies*/ isError, message, dispatch])

  // add Spinner here

  if(isLoading){
    return <Spinner/>
  } // now we display goals below GoalForm

  // Now we try implement goals

  return (
    <>  {/*emprty fragment instead of div*/}
      <section className="heading">
        <h1> Welcome {user && user.name} </h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm/>
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              // now create GoalItem.jsx in components
              <GoalItem key={goal._id} goal = {goal}/>
            ))}
          </div>
        ) : (<h3>You have not set any Goals</h3>)} 
      </section>
    </>
  )
}

export default Dashboard