import React from 'react'
import './Hero.css'
import Navbar from '../Navbar/Navbar'
const Hero = () => {
  return (
   
       
        <div className=' hero'>
          <Navbar/>
            <div className='overlay'>
                <div className="header">
                <h1 className=''>Welcome to the largest gallery in <br />the world!</h1>
                <button className='scroll'>Browse Photos</button>
                </div>
                
            </div>
            
        </div>
   
    
  )
}

export default Hero
