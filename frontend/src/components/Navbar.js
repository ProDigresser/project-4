import React from 'react'
import { Link, withRouter } from 'react-router-dom'
// import Logo from '../styles/Logo.png'

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

  return <nav>
    {/* <img className="navLogo" src={Logo} alt="Logo"/> */}
    <ul>
      <li>
        <Link className="navLink" to="/">Videos</Link>
      </li>
      <li>
        {!localStorage.getItem('token') && <Link className="navLink" to="/signup">Sign Up</Link>}
      </li>
      <li>
        {!localStorage.getItem('token') && <Link className="navLink" to="/login">Log In</Link>}
      </li>
      <li>
        {localStorage.getItem('token') && <p>Welcome back <Link className="navLink" to={`/users/${userId}`}>{userName}</Link></p>}
      </li>
      <li>
        {localStorage.getItem('token') && <Link className="navLink" to="/videos/new-video">Add a Video</Link>}
      </li>
      <li>
        {localStorage.getItem('token') && <Link className="navLink" to="/videos/edit-video">Edit a Video</Link>}
      </li>
      <li>
        {localStorage.getItem('token') && <button
          onClick={handleLogout}>
          Log Out
        </button>}
      </li>
    </ul>
  </nav>
}

export default withRouter(NavBar)