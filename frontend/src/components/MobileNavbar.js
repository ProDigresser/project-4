import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../styles/logo.jpg'
import HowTo from '../styles/HowTo.jpg'
import { slide as Menu } from 'react-burger-menu'

const MobileNavbar = (props) => {

  // Functions
  console.log(props)
  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  // Variables

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')

  

  return <nav>
    <Menu>

      
          
      {token && <Link className="menu-item" to="/add-video">Add a Video</Link>}
         
      <Link className="menu-item" to="/">Videos</Link>
     
      {!token && <Link className="menu-item" to="/login">Log In</Link>}

      {!token && <Link className="menu-item" to="/signup">Sign Up</Link>}

      {token && <button className="menu-item"
        onClick={handleLogout}>
        Log Out
      </button>}

    </Menu>
  </nav>
}

export default withRouter(MobileNavbar)

