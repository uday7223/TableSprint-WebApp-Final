import React from "react";
import { Link } from "react-router-dom";
import logo from '../Images/logo.png'
import'../CSS/dashboard.css'

const Dashboard = () => {
  return (
    <>
 
      <div className="main-con">
           
           <div className="dashboard">
                <div className="dashboard-con">
                      <img src={logo} alt="" />
                      <p>Welcome to TableSprint Admin👋</p>
                  </div>
           </div>

        </div>

    </>
  );
};

export default Dashboard;
