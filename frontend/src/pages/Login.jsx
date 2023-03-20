import React from 'react'

import {useState,useEffect} from 'react'

import {FaSignInAlt} from 'react-icons/fa'


// useSelector to select something from the state
// i.e bring in user - isSuccess, isLoading or isError
// useDispatch - we want a dispatch a function like register, or async thunk fnc
// or reset then we use this
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
// to make toast work we have to add few things in 
// App.js
import {toast} from 'react-toastify'
// bring in register and reset function from the Slice.js
import {login,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'



function Login() {

  const [formData,setFormData] = useState({
    email : '',
    password : '',
  })

  const {email,password} = formData
  
  // copy from Register.jsx
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)

    useEffect(() => {

      if(isError){
        toast.error(message)
      }

      if(isSuccess || user){
        navigate('/') // navigate to dashboard
      }

      // now we want reset the state, after any of the above happens
      dispatch(reset()) // set everything to false

      // for isLoading we will need a Spinner, we will create a Spinner
      // components inside components Spinner.jsx 
      // and will be added below dispatch(register(userData))

    }, [user,isError, isSuccess, message, navigate, dispatch] ) // dependency array
                                                                // it will fire off use-effect
                                                                // if any of these changes

  /* let us input name, email etc */
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value // get values from the fields
    }))

  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  // but we still seeing dashboard after logout -> not desirable
  // 1. we will modify it next 
  // 2. will add goals

  
  // Here we add the spinner
  if(isLoading){
    return <Spinner/>
  }

  return (<>
    <section className='heading'>
      <h1>
        <FaSignInAlt/> Login
      </h1>
      <p>Login into Account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        {/* coming from our formData and function onChange will be called */}
        <div className="form-group">
            <input type="text" className='form-control' id='email' name='email' 
                  value={email} placeholder='Enter your email' onChange={onChange} />
        </div>
        <div className="form-group">
            <input type="password" className='form-control' id='password' name='password' 
                  value={password} placeholder='Enter password' onChange={onChange} />
        </div>
        <div className="from-group">
          <button type='submit' className='btn btn-block'>
            Login
          </button>
        </div>
      </form>
    </section>
  </>)
}

export default Login