import React,{useContext, useState} from 'react'
import { MyContext } from '../../Context/Context'
import { useNavigate } from 'react-router'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'

const LoginComponent = () => {
    const {setRegistered,setToken,setId} =   useContext(MyContext)
    const [data,setData] = useState({
      email:"",
      password:""
    })



    const handleChange = (e) =>{
      setData(
          {
              ...data,
              [e.target.name]:e.target.value
          }
      )
  }
    //this will navigate without refreshing
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(data)
      

        const response = await request({
          method:requestMethods.POST,
          route:"/user/login.php",
          body:data
        })
        if(!response.error){
          if (response.token !=null){
            localStorage.setItem('token',response.token)
            localStorage.setItem('id',response.id)
            setToken(response.token)
            setId(response.id)
            navigate("/")
          }
        }
      
      }


  return (
    <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={(e)=>handleLogin(e)}>
            
            <input type="email" placeholder="Email" name='email' onChange={(e)=>handleChange(e)} required/>
            <input type="password" placeholder="Password" name='password' onChange={(e)=>handleChange(e)} required/>
            <button className="login-btn">Login</button>
        </form>
        <p className="login-register-btn">Don't have an account? <span onClick={()=>{setRegistered(false)}}>Register</span></p>
    </div>
  )
}

export default LoginComponent
