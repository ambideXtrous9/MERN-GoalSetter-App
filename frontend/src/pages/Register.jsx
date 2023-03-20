import React from 'react'

import {useState,useEffect} from 'react'


// useSelector to select something from the state
// i.e bring in user - isSuccess, isLoading or isError
// useDispatch - we want a dispatch a function like register, or async thunk fnc
// or reset then we use this
import {useSelector,useDispatch} from 'react-redux'


import {useNavigate} from 'react-router-dom'


// to make toast work we have to add few things in 
// App.js
import {toast} from 'react-toastify'



import {FaUser} from 'react-icons/fa'

// bring in register and reset function from the Slice.js

import {register,reset} from '../features/auth/authSlice'

import Spinner from '../components/Spinner'



function Register() {

  const [formData,setFormData] = useState({
    name : '',
    email : '',
    password : '',
    password2 : '' //confirm password
  })

  const {name,email,password,password2} = formData 


  // destructure the formData
  const navigate = useNavigate()
  const dispatch = useDispatch()


   

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth) //globalState
    // now go to onSubmit and check password match 
  
    // when any of the above change happens, we want to have use-effect
    // 
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

    if(password !== password2){
      toast.error('Password do not match')
    }
    else{
      const userData = { // coming from the form
        name,
        email,
        password
      }

      // dispatch user data -> dispatching register fnc from authSlice
      // register = createAsyncThunk('auth/register', async(user,thunkAPI)
      // userData is passed in in user
      dispatch(register(userData))
    }
  }

  // Here we add the spinner
  if(isLoading){
    return <Spinner/>
  }


  // now go to website register and submit details
  // after submit it should go to Dashboard
  // and check actions in redux dev tools, for the 
  // functions that are called and also check auth/user in tree

  // these are coming from userController in backend
  // we can also send only  the token also

  // now if we refresh, then also auth/user should be there
  // because of the localStorage values (redux tool -> application/localStorage)
  
  
  // Now we do logout -> destroy the token or localStorage value
  // put the func in Slice, right under register in authSlice



  return (<>
    <section className='heading'>
      <h1>
        <FaUser/> Register
      </h1>
      <p>Please Create an Account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        {/* coming from our formData and function onChange will be called */}
        <div className="form-group">
            <input type="text" className='form-control' id='name' name='name' 
                  value={name} placeholder='Enter your name' onChange={onChange} />
        </div>
        <div className="form-group">
            <input type="text" className='form-control' id='email' name='email' 
                  value={email} placeholder='Enter your email' onChange={onChange} />
        </div>
        <div className="form-group">
            <input type="password" className='form-control' id='password' name='password' 
                  value={password} placeholder='Enter password' onChange={onChange} />
        </div>
        <div className="form-group">
            <input type="password" className='form-control' id='password2' name='password2' 
                  value={password2} placeholder='Confirm password' onChange={onChange} />
        </div>
        <div className="from-group">
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      </form>
    </section>
  </>)
}

export default Register