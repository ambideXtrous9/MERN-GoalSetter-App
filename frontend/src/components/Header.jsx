import React from 'react'
// for icons to be used
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'

// import for logout
import {useSelector,useDispatch} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice' 

// Header.jsx to be added just before the Routes

function Header() {
  // initialize dispatch and navigate
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth) // from where we want the state - auth
                                                    // now go below ul of golasetter
                                                    // and cut 2 lists below and put 
                                                    // inside else part of user : ()
                                                    // <> pasete here </>


  const onLogout = () => {
    console.log('Hello World!')
    dispatch(logout())
    dispatch(reset())
    navigate('/')

    // now go to authSlice and add a case that will set user to null
    // when logout
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header