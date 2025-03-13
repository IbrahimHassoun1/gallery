import React, { useContext } from 'react'
import axios from 'axios'
import { MyContext } from '../../Context/Context'
import { useNavigate } from 'react-router'

const Signup = () => {
    const {url,setRegistered ,setToken} =   useContext(MyContext)
    const navigate = useNavigate()


    const handleRegister = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
    
        try{
          const response=await axios.post(url+"/user/register.php",data,{headers:{'Content-Type':'application/json'}})
          console.log(response.data.token)
          if (response.data.token !=null){
            localStorage.setItem('token',response.data.token)
            setToken(response.data.token)
            navigate("/")
          }
        }catch(error){
          console.log(error)
        }
      }

  return (
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
  )
}

export default Signup
