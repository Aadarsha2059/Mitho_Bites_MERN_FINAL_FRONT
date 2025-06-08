import { createContext,useState,useEffect } from "react";

export const AuthContext=createContext()

const AuthContextProvider=({children}) =>{
    const [user,setUser]=useState(null)
    const login=(userData,token) =>{
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(userData))
    }
    const logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
    }
    useEffect(() =>{
        const token =localStorage.getItem("token")
        const storedUser=localStorage.getItem("user")
        if(token && storedUser){
            setUser(JSON.parse(storedUser))
        }else{
            logout()
        }
    },[]
)
 return (
    <AuthContext.Provider
    value={{user,login,logout,isAuthenticated: user !==null}}
    >
        {children}
    </AuthContext.Provider>
 )
}
export default AuthContextProvider