import React,{useContext} from 'react'
import axios from 'axios'
import { MyContext } from '../../Context/Context'

const LoginComponent = () => {
    const {url,setRegistered} =   useContext(MyContext)
    const handleLogin = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
    
        try{
          const response=await axios.post(url+"/user/login.php",data,{headers:{'Content-Type':'application/json'}})
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }


  return (
    <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={(e)=>handleLogin(e)}>
            
            <input type="email" placeholder="Email" name='email'/>
            <input type="password" placeholder="Password" name='password'/>
            <button className="login-btn">Login</button>
        </form>
        <p className="login-register-btn">Don't have an account? <span onClick={()=>{setRegistered(false)}}>Register</span></p>
    </div>
  )
}

export default LoginComponent
