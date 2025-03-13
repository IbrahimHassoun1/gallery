import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import axios from 'axios'
import './login.css'
const Login = () => {
  const url='http://localhost/gallery/server/apis/v1'
  const [registered,setRegistered] = useState(false)
  const [token,setToken] =useState(null)
  const handleRegister = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    
    try{
      const response=await axios.post(url+"/user/register.php",data,{headers:{'Content-Type':'application/json'}})
      console.log(response)
      localStorage.setItem("token",response.data.token)
      window.location.pathname="/"
      setToken(response.data.token)
    }catch(error){
      console.log(error)
    }
  }


  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    try{
      const response=await axios.post(url+"/user/login.php",data,{headers:{'Content-Type':'application/json'}})
      console.log(response)
      localStorage.setItem("token",response.data.token)
      window.location.pathname="/"
      setToken(response.data.token)
    }catch(error){
      console.log(error)
    }
  }


  return (
    <div className='login'>
        
        {registered?
        <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={(e)=>handleLogin(e)}>
            
            <input type="email" placeholder="Email" name='email'/>
            <input type="password" placeholder="Password" name='password'/>
            <button className="login-btn">Login</button>
        </form>
        <p className="login-register-btn">Don't have an account? <span onClick={()=>{setRegistered(true)}}>Register</span></p>
    </div>:
      <div className="login-form">
      <h1>Register</h1>
      <form onSubmit={(e)=>handleRegister(e)}>
          <input type="text" placeholder="name" name='name'/>
          <input type="email" placeholder="Email" name='email'/>
          <input type="password" placeholder="Password" name='password'/>
          <button className="login-btn">Register</button>
      </form>
      <p className="login-register-btn">Already have an account? <span onClick={()=>{setRegistered(true)}}>Login</span></p>
  </div>
      }
        
    </div>
  )
}

export default Login
