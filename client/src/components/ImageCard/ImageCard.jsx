import React, { useContext, useEffect } from 'react'
import './ImageCard.css'
import axios from 'axios'
import { MyContext } from '../../Context/Context'

const ImageCard = ({image_id,src,title,description,index}) => {
    const {url,images,setImages} = useContext(MyContext)
    const deleteImage= async (element_id)=>{
        try{
            const response = await axios.post(url+"/image/deleteImage.php" ,{"id":element_id},{
                headers: { 'Content-Type': 'application/json' }
            });
            
            
            setImages(images => images.filter((_, i) => i !== index));

            
        }catch(error){
            console.log(error)
            
        }
    }
    useEffect(()=>{
        console.log("new images: "+images)
    },[images])
  return (
    
        <div className="image-card">
            <img  src={src} alt="image" />
            <div className="image-card-content">
                
                <div className='info'>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className='buttons'>
                    <button className='delete-button' onClick={()=>deleteImage(image_id)}>Delete</button>
                    <button>Edit</button>
                </div>
            </div>
        </div>

  )
}

export default ImageCard
