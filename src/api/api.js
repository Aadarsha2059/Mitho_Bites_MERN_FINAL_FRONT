import axios from "axios"
// ✅ BURP SUITE FIX: Always use direct backend URL to bypass Vite proxy
// This ensures all requests go through Burp Suite when browser is configured with Burp proxy
const API_URL=import.meta.env.VITE_API_BASE_URL ||
       "http://localhost:5050/api" //fallback - direct backend URL (bypasses Vite proxy)

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
    console.log('🌐 API Request:', config.method?.toUpperCase(), config.url, 'Token:', token ? 'Present' : 'Missing');
    
    // ✅ BURP SUITE: Log auth requests with credentials
    if (config.url?.includes('/auth/login') || config.url?.includes('/auth/register') || config.url?.includes('/auth/verify-otp')) {
        console.log('🔐 🔐 🔐 AUTH REQUEST BEING SENT - VISIBLE IN BURP SUITE 🔐 🔐 🔐');
        console.log('📍 Method:', config.method?.toUpperCase());
        console.log('📍 URL:', config.url);
        console.log('📝 Request Data:', config.data ? JSON.stringify(config.data, null, 2) : 'No data');
        console.log('💡 This request will be intercepted by Burp Suite');
        console.log('💡 Check Burp Suite → Proxy → HTTP history (not Intercept tab)');
        console.log('💡 Look for POST request (not OPTIONS) with credentials in request body');
    }
    
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
       

