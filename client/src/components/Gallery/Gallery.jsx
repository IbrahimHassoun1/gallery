import React, { useContext, useEffect, useState } from 'react'
import './Gallery.css'
import ImageCard from '../ImageCard/ImageCard'
import AddImage from '../AddImage/AddImage'
import { MyContext } from '../../Context/Context'
import axios from 'axios'



const Gallery = () => {
  const {addPopup, setAddPopup,id,url}=useContext(MyContext)
  const [images,setImages] = useState([])


  const getAllImages = async ()=>{
    try{
      const response = await axios.post(url+"/image/readAllImages.php" ,{"owner_id":id},{
          headers: { 'Content-Type': 'application/json' }
      });
      console.log(response);
      setImages(response.data.data)
  }catch(error){
      console.log(error)
      
  }
  }


  useEffect(()=>{
    getAllImages()
  },[id])


  return (
    <div className='parent'>
      {addPopup?<AddImage/>:""}
    <div className='container gallery'>
        
        <h1>Photos</h1>
        <hr />
        <div className="table">
          {id!=null?
          images.map(element=>{
            return <ImageCard src={element.path} title={element.path} description={element.description} key={element.id}/>
          })
          :"Login to access images"}
      
          </div>

          <button addPopup={addPopup} setAddPopup={setAddPopup} onClick={()=>setAddPopup(true)}>Add Image</button>
    </div>
    </div>
    
  )
}

export default Gallery
