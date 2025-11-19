import { createContext,useState,useEffect } from "react";

export const AuthContext=createContext()

const AuthContextProvider=({children}) =>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    // Admin credentials
    const ADMIN_CREDENTIALS = {
        username: 'admin_aadarsha',
        password: 'admin_password'
    };

    const isAdminUser = (userData) => {
        return userData && userData.username === ADMIN_CREDENTIALS.username;
    };

    const login=(userData,token) =>{
        console.log('=== AuthProvider Login ===');
        console.log('User data:', userData);
        console.log('Token:', token);
        
        setLoading(true)
        
        if (!token || !userData) {
            console.error('Login failed: Missing token or user data');
            setLoading(false);
            return;
        }
        
        // Check if this is an admin user
        const isAdmin = isAdminUser(userData);
        
        // Add admin flag to user data
        const userWithRole = {
            ...userData,
            isAdmin: isAdmin,
            role: isAdmin ? 'admin' : 'user'
        };
        
        console.log('Storing token in localStorage:', token);
        console.log('Storing user in localStorage:', userWithRole);
        
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(userWithRole))
        setUser(userWithRole)
        setLoading(false)
        
        console.log('Login complete. Token stored:', localStorage.getItem('token') ? 'Yes' : 'No');
    }
    
    const logout=()=>{
        setLoading(true)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        
        setUser(null)
        setLoading(false)
    }
    
    useEffect(() =>{
        setLoading(true)
        const token =localStorage.getItem("token")
        const storedUser=localStorage.getItem("user")
        if(token && storedUser){
            const userData = JSON.parse(storedUser);
            // Re-check admin status on app load
            const isAdmin = isAdminUser(userData);
            const userWithRole = {
                ...userData,
                isAdmin: isAdmin,
                role: isAdmin ? 'admin' : 'user'
            };
            setUser(userWithRole)
        }else{
            logout()
        }
        setLoading(false)
    },[])
    
 return (
    <AuthContext.Provider
    value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: user !==null,
        isAdmin: user?.isAdmin || false
    }}
    >
        {children}
    </AuthContext.Provider>
 )
}
export default AuthContextProvider



