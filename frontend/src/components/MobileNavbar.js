import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import HowTo from '../styles/HowTo.jpg'
import { bubble as Menu } from 'react-burger-menu'

const MobileNavbar = (props) => {

  // Functions

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  // Variables

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')



  return <div className="mobileNavbar">

    <nav>
      <img src={HowTo} height={150} alt="logo" />
      <Menu width={180}>
        {token && <Link className="menu-item" to="/add-video">Add a Video</Link>}

        {token && <Link className="menu-item" to="/users">Users</Link>}

        <Link className="menu-item" to="/">Videos</Link>

        {token && <Link className="menu-item" to={`/users/${userId}`}>My Profile</Link>}

        {!token && <Link className="menu-item" to="/login">Log In</Link>}

        {!token && <Link className="menu-item" to="/signup">Sign Up</Link>}

        {token && <button className="menu-item"
          onClick={handleLogout}>
          Log Out
        </button>}
      </Menu>
    </nav>
  </div>
}

export default withRouter(MobileNavbar)

