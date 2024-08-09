import React from 'react'
import '../CSS/sidebar.css'
import { NavLink } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Sidebar = () => {
  return (
      <>
          <div className="sidebar">
        
                <div className="links">
                    <li><NavLink to="/adminPortal/" style={({ isActive }) => {return isActive ? { color: "yellow" } : {};}}> <HomeOutlinedIcon className="icon" fontSize="medium" />Dashboard</NavLink></li>
                    <li><NavLink to="/adminPortal/category" style={({ isActive }) => {return isActive ? { color: "yellow" } : {};}}> <CategoryOutlinedIcon className="icon"/>  Category</NavLink></li>
                    <li><NavLink to="/adminPortal/subcategory" style={({ isActive }) => {return isActive ? { color: "yellow" } : {};}}> <FormatListBulletedOutlinedIcon className="icon" /> Subcategory</NavLink></li>
                    <li><NavLink to="/adminPortal/product" style={({ isActive }) => {return isActive ? { color: "yellow" } : {};}}> <Inventory2OutlinedIcon className="icon"/> Products</NavLink></li>
                    <li><NavLink to="/"><LogoutOutlinedIcon className="icon"/>  Log out</NavLink></li>
                </div>

        </div>

      </>


  )
}

export default Sidebar