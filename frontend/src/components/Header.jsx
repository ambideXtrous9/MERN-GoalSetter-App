import React from 'react'

// for icons to be used
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'

import {Link} from 'react-router-dom'


// Header.jsx to be added just before the Routes

function Header() {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        <li>
          <Link to = '/login'>
            <FaSignInAlt/> Login
          </Link>
        </li>
        <li>
          <Link to = '/register'>
            <FaUser/> Register
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header