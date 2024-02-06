import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import FormAddBook from './FormAddBook';
import Main from './Main';
import './App.css';
import axios from "axios"

import React,{useState, useEffect} from 'react';
import {Routes, Route, useNavigate, Navigate} from "react-router-dom"
import BookList from './BookList';
function App() {
  const [userDetails, setUserDetails] = useState({email:"", password:""})
  const [logged, setLogged] = useState(false)
  const [displayBooks, setDisplayBooks] = useState([])
  const [searchBook, setSearchBook] = useState("");
  const navigate = useNavigate()
  
  const handleLogout = () => {
    setLogged(false);
    setUserDetails({email:"", password:""});
  }
  
  useEffect(()=>{
    if (!logged) {
      navigate("/login")
    } else {
      const fetchBook = async () => {
        console.log("click");
        const response = await axios.get("http://localhost:3002/")
        const data = await response.data;
        setDisplayBooks(data);
        console.log(data);
      }
      fetchBook()
    }
    
  },[logged])
  // useEffect(()=>{
  //   console.log(displayBooks);
  // },[displayBooks])
  return (
    <>
    <Navbar logged={logged} handleLogout = {handleLogout} userDetails={userDetails} />
      <Routes>
        <Route path="/" element={<Main displayBooks={displayBooks} />}/>
        <Route path="/list" element={<BookList searchBook={searchBook} setSearchBook={setSearchBook} />}/>
        <Route path="/signup" element={<Signup userDetails={userDetails} setUserDetails={setUserDetails} logged={logged} setLogged={setLogged} />}/>
        <Route path="/login" element={<Login userDetails={userDetails} setUserDetails={setUserDetails} logged={logged} setLogged={setLogged} />}/>
      </Routes>
      
    </>
  );
}

export default App;
