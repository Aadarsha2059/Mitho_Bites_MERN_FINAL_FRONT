import axios from "axios"
const API_URL=import.meta.env.VITE_API_BASE_URL ||
       "http://localhost:5050/api" //fallback

const instance =axios.create(
    {
        baseURL:API_URL,
        headers:{
            "Content-Type":"application/json"
        }
    }
)       
instance.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token")
    console.log('=== API REQUEST DEBUG ===');
    console.log('Request URL:', config.url);
    console.log('Request method:', config.method);
    console.log('Has token:', !!token);
    console.log('Token length:', token?.length);
    
    if(token){
        config.headers.Authorization="Bearer " + token
        console.log('Authorization header set');
    } else {
        console.log('No token found in localStorage');
    }
    return config
})

export default instance
       
