import React, { use, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import "./AddImage.css"
import { MyContext } from '../../Context/Context'
const AddImage = () => {

    const {addPopup, setAddPopup,url}=useContext(MyContext)
    const {image,setImage} = useState(null)
   
    const [data,setData] = useState({
        title:"",
        description:"",
        image:""
    })

    const handleChange = (e) =>{
        setData(
            {
                ...data,
                [e.target.name]:e.target.value
            }
        )
    }
    const handleImage = (e) =>{
        const image = e.target.files[0]
        if(!image)return;

        const reader = new FileReader()
        reader.onload = () => {
            console.log(reader.result); // This is your Base64 string
        };
    
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };
    
        ;
        setImage(reader.readAsDataURL(image))

    }
    const addImage = async (e) =>{
        e.preventDefault()
        const apiData = {
            ...data,
            image:image
        }
        const response = await axios.post(url+"/image/createImage.php", apiData, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response);
    }
  return (
    <div className='add-image' >
        <div className='relative' onClick={()=>setAddPopup(false)}>
            
        </div>
        <div className="table">
            <form action="">
                <input  
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                const preview = document.getElementById('image-preview');
                                preview.src = reader.result;
                            };
                            reader.readAsDataURL(file);
                            handleImage(e);
                        }
                    }} 
                    name='image'
                    
                />
                <img id="image-preview" alt="Image Preview" style={{ display: 'block', marginTop: '10px', maxWidth: '100%' }} />
                <input type="text" placeholder="Title" name="title" required  onChange={(e)=>handleChange(e)}/>
                <textarea placeholder="Description" name="description" required onChange={(e)=>handleChange(e)}></textarea>
                <button type="submit" onClick={(e)=>addImage(e)}>Submit</button>
            </form>
        </div>
    
    </div>
  )
}

export default AddImage
