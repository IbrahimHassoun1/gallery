import React, { useContext, useState } from 'react'
import { MyContext } from '../../Context/Context'
import { useNavigate } from 'react-router'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'

const Signup = () => {

    const {setRegistered ,setToken,setId} =   useContext(MyContext)
    const [feedback,setFeedback]=useState("")
    const [data,setData] = useState({
          email:"",
          password:"",
          name:""
        })
    const handleChange = (e) =>{
          setData(
              {
                  ...data,
                  [e.target.name]:e.target.value
              }
          )
      }
    const navigate = useNavigate()
    

    const handleRegister = async (e) => {
        e.preventDefault()
    
        const response = await request({
          method:requestMethods.POST,
          route:"/user/register.php",
          body:data
        })
        
        if(response.error){
          console.log(response)
          setFeedback(response.message)
        }else{
          if(response.status!=200){
            setFeedback("Error")
          }
          if (response.token !=null){
            localStorage.setItem('token',response.token)
            localStorage.setItem("id",response.id)
            setToken(response.token)
            setId(response.id)
            navigate("/")
          }
        }


      
      }

  return (
    <div className="login-form">
      <h1>Register</h1>
      <form onSubmit={(e)=>handleRegister(e)}>
          <input type="text" placeholder="name" name='name' onChange={(e)=>handleChange(e)} required/>
          <input type="email" placeholder="Email" name='email' onChange={(e)=>handleChange(e)} required/>
          <input type="password" placeholder="Password" name='password' onChange={(e)=>handleChange(e)} required/>
          <button className="login-btn">Register</button>
      </form>
      <p className="login-register-btn">Already have an account? <span onClick={()=>{setRegistered(true)}}>Login</span></p>
      <h1>{feedback!=null?feedback:""}</h1>
  </div>
  )
}

export default Signup
