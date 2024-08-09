import React from 'react'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import logo from '../Images/logo.png'
import '../CSS/navbar.css'
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
        
        <div className="navbar">
          
          <div className="logo flex">  <img src={logo} alt="" /> </div>
          <div className="links"><AccountCircleSharpIcon/> {/* <KeyboardCommandKeyRoundedIcon/>*/}             
          </div>
        
        </div>
    
    </>
)
}

export default Navbar