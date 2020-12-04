import React from 'react'
import { Link, withRouter } from 'react-router-dom'

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
    <ul>
      <li>
        <Link to="/">Videos</Link>
      </li>
      <li>
        {!localStorage.getItem('token') && <Link to="/signup">Sign Up</Link>}
      </li>
      <li>
        {!localStorage.getItem('token') && <Link to="/login">Log In</Link>}
      </li>
      <li>
        {localStorage.getItem('token') && <p>Welcome back <Link to={`/users/${userId}`}>{userName}</Link></p>}
      </li>
      <li>
        {localStorage.getItem('token') && <Link to="/videos/new-video">Add a Video</Link>}
      </li>
      <li>
        {localStorage.getItem('token') && <Link to="/videos/edit-video">Edit a Video</Link>}
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