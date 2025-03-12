import React from 'react'
import './ImageCard.css'
const ImageCard = ({src}) => {
  return (
    <div>
        <div className="image-card">
            <img src={src} alt="image" />
            <div className="image-card-content">
                
                <div className='info'>
                    <h3>Image Title</h3>
                    <p>Image Description</p>
                </div>
                <div className='buttons'>
                    <button className='delete-button'>Delete</button>
                    <button>Edit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImageCard
