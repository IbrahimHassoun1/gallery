import React, { createContext,useState } from 'react'

export const MyContext = createContext(null)

const ContextProvider = ({children}) =>{
    const url='http://localhost/gallery/server/apis/v1'
    const [registered,setRegistered] = useState(false)
    const [token,setToken] = useState(null)
    const [addPopup, setAddPopup] = useState(false)
    const test="test"
    const value={
        url,
        registered,setRegistered,
        addPopup, setAddPopup,
        token,setToken,
        test
    }
    
    

    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextProvider;

