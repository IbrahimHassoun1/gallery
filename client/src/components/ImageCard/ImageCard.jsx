import React, { useContext, useEffect } from 'react'
import './ImageCard.css'
import axios from 'axios'
import { MyContext } from '../../Context/Context'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'

const ImageCard = ({image_id,src,title,description,index}) => {

    const {url,images,setImages} = useContext(MyContext)

    const deleteImage= async (element_id)=>{

        const response = await request({
            method:requestMethods.POST,
            route:"/image/deleteImage.php",
            body:{"id":element_id}
        })

        if(!response.error){
            setImages(images => images.filter((_, i) => i !== index));
        }
        
    }



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
