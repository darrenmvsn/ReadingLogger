import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import './App.css';
import React,{useState, useEffect} from 'react';
import {Routes, Route, useNavigate, Navigate} from "react-router-dom"
function App() {
  const [userDetails, setUserDetails] = useState({email:"", password:""})
  const [logged, setLogged] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    if (!logged) {
      navigate("/login")
    }
    
  },[])
  return (
    <>
    <Navbar logged={logged}/>
      <Routes>
        <Route path="/signup" element={<Signup userDetails={userDetails} setUserDetails={setUserDetails} logged={logged} setLogged={setLogged} />}/>
        <Route path="/login" element={<Login userDetails={userDetails} setUserDetails={setUserDetails} logged={logged} setLogged={setLogged} />}/>
      </Routes>
      
    </>
  );
}

export default App;
