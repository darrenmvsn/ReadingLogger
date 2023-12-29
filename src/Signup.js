import React, { useEffect } from 'react'
import { FormControl, Input, InputLabel, FormHelperText, FormGroup, Button } from '@mui/material';
import "./login.css"
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
const Signup = ({userDetails, setUserDetails,logged, setLogged}) => {
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(userDetails);
        const resp = await axios.post("http://localhost:3002/login", userDetails);
        // console.log(resp.data);
        const msg = await resp.data
        console.log(resp.status);
        if (resp.status === 200) {
            setLogged(true)
        }
    }
    useEffect(()=>{
        if (logged) {
            navigate("/")
        }
        
    },[logged])
  return (
    <FormGroup className='login' >
        <FormControl size="medium"  >
            <InputLabel htmlFor="email"  >Email Address</InputLabel>
            <Input type='email' id="email" aria-describedby="my-helper-text" size="medium" required={true} value={userDetails.email} onChange={(e)=> setUserDetails({...userDetails, email: e.target.value})} />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>  
        </FormControl>
        <FormControl size="medium"  >
            <InputLabel htmlFor="pw"  >password</InputLabel>
            <Input type='password' id="pw" aria-describedby="my-helper-text" size="medium" required={true} onChange={(e)=> setUserDetails({...userDetails,password: e.target.value})}/>
            <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
        </FormControl>
    <Button color='info' type='submit' onClick={(e)=>handleLogin(e)}> Login </Button>
    <Link to="/login">
        <FormHelperText>Already have an account</FormHelperText>
    </Link>
    
    </FormGroup>
    
  )
}

export default Signup