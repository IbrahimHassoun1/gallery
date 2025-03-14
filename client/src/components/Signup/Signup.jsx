import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { MyContext } from '../../Context/Context'
import { useNavigate } from 'react-router'

const Signup = () => {
    const {url,setRegistered ,setToken,test,setId} =   useContext(MyContext)
    const navigate = useNavigate()
    useEffect(() => {console.log(test)}, [test])

    const handleRegister = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        
    
        try{
          const response=await axios.post(url+"/user/register.php",data,{headers:{'Content-Type':'application/json'}})
          
          if (response.data.token !=null){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem("id",response.data.id)
            setToken(response.data.token)
            setId(response.data.id)
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
          <input type="text" placeholder="name" name='name'required/>
          <input type="email" placeholder="Email" name='email'required/>
          <input type="password" placeholder="Password" name='password'required/>
          <button className="login-btn">Register</button>
      </form>
      <p className="login-register-btn">Already have an account? <span onClick={()=>{setRegistered(true)}}>Login</span></p>
  </div>
  )
}

export default Signup
