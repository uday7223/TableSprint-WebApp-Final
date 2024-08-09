import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Adminportal from './Components/Adminportal';


function App() {
  return (
   <>
       
      <BrowserRouter>

          <Routes>
            
            <Route path="/" element={<Login/>} />
            <Route path="/adminportal/*" element={<Adminportal/>} />
           

          </Routes>
   
      
      </BrowserRouter>
       
   
   </>
  );
}

export default App;
