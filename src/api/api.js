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
    console.log('API Request:', config.url, 'Token:', token ? 'Present' : 'Missing');
    if(token){
        config.headers.Authorization="Bearer " + token
    }
    return config
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Authentication error:', error.response.data);
            // Optionally redirect to login
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default instance
       

