import React from 'react'
import "./navbar.css"
import { Link } from 'react-router'
const Navbar = () => {
return (
    <div className='navbar container'>
        <h1>Soura</h1>
        <button><Link to="/login">Signup</Link></button>
        

    </div>
)
}

export default Navbar
