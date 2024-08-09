import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css'
import logo from '../Images/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend login endpoint
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.data.success) {
        navigate('/adminportal');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (



    <>
        <div className="login">


        <form onSubmit={handleLogin}>

        <div className="login-con">
        

        
        <div className="logo">
                    <img src={logo} alt="" />
                    <p>Welcome to TableSprint</p>
                </div>

          
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          

       
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
          <a href="">forgot password ?</a>


          <button className='main-btn' type='submit' > Log In</button>


        </div>
      </form>






        </div>
    
    </>
    
  );
};

export default Login;
