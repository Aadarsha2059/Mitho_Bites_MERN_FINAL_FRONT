import axios from "./api"
import axiosDirect from "axios"

// Helper function to get JWT token
const getJWTToken = () => {
    return localStorage.getItem("token");
};

// ✅ XSRF Token: Get CSRF token from server
export const getCSRFToken = async () => {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:5443/api";
        const response = await axiosDirect.get(`${baseUrl}/csrf-token`, {
            withCredentials: true // Include cookies for session-based CSRF token
        });
        return response.data.csrfToken;
    } catch (error) {
        console.error('Failed to get CSRF token:', error);
        // Fallback: try to get from axios instance
        try {
            const response = await axios.get('/csrf-token', {
                withCredentials: true
            });
            return response.data.csrfToken;
        } catch (fallbackError) {
            throw error;
        }
    }
};

export const registerUserApi=(data) =>axios.post("/auth/register",data)

export const loginUserApi=(data) =>axios.post("/auth/login",data)

export const forgotPasswordApi=(data) =>axios.post("/auth/forgot-password",data)

export const resetPasswordApi=(token, data) =>axios.post(`/auth/reset-password/${token}`,data)

// ✅ XSRF Token: Update user info with CSRF token
export const updateUserProfileApi = async (userId, data) => {
    // Get CSRF token before making state-changing request
    const csrfToken = await getCSRFToken();
    
    return axios.put(`/auth/update`, data, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            Authorization: `Bearer ${getJWTToken()}`,
        },
        withCredentials: true, // Include cookies for session
    });
};

// ✅ XSRF Token: Update user info via /info endpoint (with CSRF protection)
// Sending XSRF Token for Updating Profile
export const updateUserInfo = (user, token) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:5443/api";
    
    // Get CSRF token before making state-changing request
    return getCSRFToken().then(csrfToken => {
        return fetch(`${baseUrl}/auth/info`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfToken,
                Authorization: getJWTToken(),
            },
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(user),
        }).then(response => response.json());
    });
};

export const changePasswordApi=(data) =>axios.post("/auth/change-password",data)

export const verifyOTPApi=(data) =>axios.post("/auth/verify-otp",data)




