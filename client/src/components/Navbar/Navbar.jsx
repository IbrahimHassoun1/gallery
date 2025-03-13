import React from 'react'
import "./navbar.css"
import { Link } from 'react-router'
const Navbar = () => {
return (
    <div className='navbar '>
        <div className="navbar-content container">
        <h1>Soura</h1>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li><button><Link to="/login">Signup</Link></button></li>
        </ul>
        
        </div>
        

    </div>
)
}

export default Navbar
