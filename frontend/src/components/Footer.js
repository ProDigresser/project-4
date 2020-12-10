import React from 'react'
import logo from '../styles/howtologo.jpg'
import HowTo from '../styles/HowTo.jpg'

const Footer = () => {
  return <footer>
    <div className="content">
    <img src={logo} height={100} alt="logo" />
    <p>Lovingly crafted by Dec Burns (@_DBPHOTO_), Laurence Walshe (@Pro_Digresser) and Sherryll Elliott (@ElliottSherryll) </p>
    <img src={HowTo} height={100} alt="HowTo" />
    </div>
    <small>December 2020</small>
    
  </footer>
}
export default Footer