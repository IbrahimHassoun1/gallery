import React,{useContext} from 'react'
import axios from 'axios'
import { MyContext } from '../../Context/Context'
import { useNavigate } from 'react-router'

const LoginComponent = () => {
    const {url,setRegistered,setToken,setId} =   useContext(MyContext)
    //this will navigate without refreshing
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
    
        try{
          const response=await axios.post(url+"/user/login.php",data,{headers:{'Content-Type':'application/json'}})
          console.log(response.data.token)
          if (response.data.token !=null){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('id',response.data.id)
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
