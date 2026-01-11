import axios from "axios"
import { toast } from "react-toastify"
// ✅ HTTPS CONFIGURATION: Use HTTPS for secure communication
// Backend HTTPS server runs on port 5443 (configured in server-https.js)
// For development with self-signed certificates, browser will show a warning - accept it to proceed
const API_URL=import.meta.env.VITE_API_BASE_URL ||
       "https://localhost:5443/api" //fallback - HTTPS backend URL for secure communication

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
        // Handle network errors (connection refused, timeout, etc.)
        if (error.code === 'ERR_NETWORK' || error.message?.includes('ECONNREFUSED') || error.message?.includes('Network Error')) {
            console.error('❌ Network Error: Cannot connect to server');
            console.error('💡 Please ensure backend is running on port 5050');
            console.error('💡 Check if backend server is started: npm start (in Backend directory)');
            error.message = 'Cannot connect to server. Please ensure backend is running on port 5050.';
        } else if (error.response?.status === 401) {
            const errorData = error.response.data;
            const errorCode = errorData?.code;
            const errorMessage = errorData?.message || 'Session expired';
            
            // Check if it's a session expiration error
            if (errorCode === 'SESSION_EXPIRED' || errorCode === 'SESSION_TIMEOUT' || errorMessage.includes('Session expired') || errorMessage.includes('inactivity')) {
                console.warn('⚠️ Session expired. Automatically logging out...');
                
                // Clear authentication data
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                
                // Show toast notification
                toast.warning('Your session has expired due to inactivity. Please login again.', {
                    autoClose: 3000,
                    position: 'top-center'
                });
                
                // Redirect to login page
                // Check if we're already on login page to avoid redirect loop
                if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/auth')) {
                    // Use setTimeout to avoid navigation during render
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 500);
                }
            } else {
                console.error('Authentication error:', errorData);
            }
        } else if (error.response?.status >= 500) {
            console.error('Server error:', error.response.data);
            error.message = error.response?.data?.message || 'Server error. Please try again later.';
        } else if (error.response?.status >= 400) {
            console.error('Client error:', error.response.data);
            error.message = error.response?.data?.message || 'Request failed. Please check your input.';
        }
        return Promise.reject(error);
    }
)

export default instance
       

