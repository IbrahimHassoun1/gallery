import React, { createContext,useState } from 'react'

export const MyContext = createContext(null)

const ContextProvider = ({children}) =>{
    const url='http://localhost/gallery/server/apis/v1'
    const [registered,setRegistered] = useState(false)

    const value={
        url,
        registered,setRegistered
    }
    
    

    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextProvider;

