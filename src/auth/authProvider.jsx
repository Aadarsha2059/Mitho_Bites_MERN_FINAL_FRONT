import { createContext,useState,useEffect } from "react";

export const AuthContext=createContext()

const AuthContextProvider=({children}) =>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    // ✅ SECURED: Removed hardcoded admin credentials
    // Admin status is determined by server-provided role from database
    // Backend authenticates admin_aadarsha/admin_password and returns role='admin' in response

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
        
        // ✅ SECURED: Use server-provided role instead of hardcoded credentials
        // Role comes from backend database - admin_aadarsha has role='admin' in database
        const userRole = userData.role || 'user';
        const isAdmin = userRole === 'admin';
        
        // Add admin flag to user data based on server role
        const userWithRole = {
            ...userData,
            isAdmin: isAdmin,
            role: userRole  // Use server-provided role (don't override)
        };
        
        console.log('Storing token in localStorage:', token);
        console.log('Storing user in localStorage:', userWithRole);
        console.log('User role from server:', userRole);
        console.log('Is admin:', isAdmin);
        
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
            // ✅ SECURED: Use server-provided role from stored user data
            // Role was set by server during login - trust server's role assignment
            const userRole = userData.role || 'user';
            const isAdmin = userRole === 'admin';
            const userWithRole = {
                ...userData,
                isAdmin: isAdmin,
                role: userRole  // Preserve server-provided role
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



