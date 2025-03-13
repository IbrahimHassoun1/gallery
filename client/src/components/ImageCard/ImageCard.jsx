import React, { useEffect } from 'react'
import './ImageCard.css'
const ImageCard = ({id,src,title,description}) => {
    
  return (
    
        <div className="image-card">
            <img  src={src} alt="image" />
            <div className="image-card-content">
                
                <div className='info'>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className='buttons'>
                    <button className='delete-button'>Delete</button>
                    <button>Edit</button>
                </div>
            </div>
        </div>

  )
}

export default ImageCard
