import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../styles/logo.jpg'
import HowTo from '../styles/HowTo.jpg'

const NavBar = (props) => {

  // Functions

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  // Variables

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')

  // Content

  return <div>
    <nav>
      <ul>
        <img className="logo" src={logo} alt="logo" />
        <img className="image" src={HowTo} alt="howto" />
        <li>
          {!localStorage.getItem('token') && <Link className="navLink" to="/signup">Sign Up</Link>}
        </li>
        <li>
          {!localStorage.getItem('token') && <Link className="navLink" to="/login">Log In</Link>}
        </li>
        <li>
          <Link className="navLink" to="/">Videos</Link>
        </li>
        <li>
          {localStorage.getItem('token') && <Link className="navLink" to="/videos/new-video">Add a Video</Link>}
        </li>
        <li>
          {localStorage.getItem('token') && <Link className="navLink" to="/videos/edit-video">Edit a Video</Link>}
        </li>
        <li className="navLogout">
          {localStorage.getItem('token') && <button
            onClick={handleLogout}>
            Log Out
          </button>}
        </li>
      </ul>
    </nav>
    <p>
      {localStorage.getItem('token') && <p>Welcome back <Link to={`/users/${userId}`}>{userName}</Link></p>}
    </p>
  </div>
}

export default withRouter(NavBar)