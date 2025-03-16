/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './Gallery.css'
import ImageCard from '../ImageCard/ImageCard'
import AddImage from '../AddImage/AddImage'
import { MyContext } from '../../Context/Context'
import axios from 'axios'
import FadeInOut from '../../Effects/FadeInOut'
import { request } from '../../utils/remote/axios'
import { requestMethods } from '../../utils/enum/request.methods'



const Gallery = () => {
  const {addPopup, setAddPopup,id,url,images,setImages}=useContext(MyContext)
  


  const getAllImages = async ()=>{
    const response = await request({
      method:requestMethods.POST,
      route:"/image/readAllImages.php",
      body:{"owner_id":localStorage.getItem("id")}
    })
    if(!response.error){
      setImages(response.data)
    }
  }


  useEffect(()=>{
    localStorage.getItem("id")!=null?
    getAllImages():"",
    console.log(images)
  },[])

 

  return (
    <div className='parent'>
      {addPopup?<AddImage/>:""}
    <div className='container gallery'>
        
        <h1>Photos</h1>
        <hr />
        <div className="table">
          {images.length>0?
          images.map((element,index)=>{
            return <FadeInOut direction='in'><ImageCard src={element.base64} title={element.title} description={element.description} key={element.id} image_id={element.id} index={index}/></FadeInOut>
          })
          :id!=null?
          <h1>You still have no images,upload some!</h1>
          :<h1>Login to access images</h1>}
        
          </div>
          {id!=null? <button addPopup={addPopup} setAddPopup={setAddPopup} onClick={()=>setAddPopup(true)}>Add Image</button>:""}
          
    </div>
    </div>
    
  )
}

export default Gallery
