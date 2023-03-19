import React from 'react'

import {useState,useEffect} from 'react'

import {FaSignInAlt} from 'react-icons/fa'


function Login() {

  const [formData,setFormData] = useState({
    email : '',
    password : '',
  })

  const {email,password} = formData 

  /* let us input name, email etc */
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value // get values from the fields
    }))

  }

  const onSubmit = (e) => {
    e.preventDefault()
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