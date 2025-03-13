import React, { useContext } from 'react'
import "./navbar.css"
import { Link } from 'react-router'
import { MyContext } from '../../Context/Context'
const Navbar = () => {
    const {id,setId,setImages} = useContext(MyContext)
return (
    <div className='navbar '>
        <div className="navbar-content container">
        <h1>Soura</h1>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li><button className={id!=null?"Logout":"Signup"}>
            {id!=null?
             <span onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("id");setId(null);setImages([])}}>Logout</span>
            :<Link to="/login" className='link' >Signup</Link>}
                
                
                </button></li>
        </ul>
        
        </div>
        

    </div>
)
}

export default Navbar
