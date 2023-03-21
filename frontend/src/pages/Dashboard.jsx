// add vs code extension ES7+ React/Redux
// type rfce -> it will add the function snippet reactFunctionalExportComponent
// do the same for Login and Register

import React from 'react'

import {useEffect} from 'react'

// useSelector to select something from the state
// i.e bring in user - isSuccess, isLoading or isError
// useDispatch - we want a dispatch a function like register, or async thunk fnc
// or reset then we use this
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import GoalForm from '../components/GoalForm' // put it right below the section

function Dashboard() {

  const navigate = useNavigate()
  // useSelector takes a function, and argument to the function is state
  const {user} = useSelector((state) => state.auth)

  // useEffect takes a function, and dependency array
  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  },[user,navigate])

  // Now we try implement goals

  return (
    <>  {/*emprty fragment instead of div*/}
      <section className="heading">
        <h1> Welcome {user && user.name} </h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm/>
    </>
  )
}

export default Dashboard