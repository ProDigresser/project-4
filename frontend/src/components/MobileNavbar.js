import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../styles/logo.jpg'
import HowTo from '../styles/HowTo.jpg'
import { slide as Menu } from 'react-burger-menu'

const MobileNavbar = (props) => {

  // Functions

  // function handleLogout() {
  // localStorage.removeItem('token')
  // props.history.push('/')
  // }

  // Variables

  // const token = localStorage.getItem('token')
  // const userId = localStorage.getItem('userId')
  // const userName = localStorage.getItem('userName')

  return <nav> {...props}>
      <a>Home</a>
    <a>Videos</a>
    <a>Add a Video</a>
    <a>Edit a video</a>
    <a>Logout</a>
  </nav>
}

export default MobileNavbar

