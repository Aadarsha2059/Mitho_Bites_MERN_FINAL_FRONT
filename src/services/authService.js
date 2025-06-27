import { registerUserApi } from "../api/authApi";
import { loginUserApi } from "../api/authApi";
import { forgotPasswordApi, resetPasswordApi } from "../api/authApi";
import { updateUserProfileApi } from "../api/authApi";

export const registerUserService=async (formData) =>{
    try{
        const response = await registerUserApi(formData)
        return response.data 
    }catch(err){
        throw err.response?.data || {message:"Registration failed"}
    }

}

export const loginUserService=async(formData) => {
    try{
        const response= await loginUserApi(formData)
        return response.data
    }catch(err){
        console.log(err)
        throw err?.response?.data || {message:"login failed"}
    }
}

export const forgotPasswordService = async (emailData) => {
    try {
        const response = await forgotPasswordApi(emailData);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to send reset email" };
    }
};

export const resetPasswordService = async ({ token, password }) => {
    try {
        const response = await resetPasswordApi(token, { password });
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to reset password" };
    }
};

export const updateUserProfileService=async(userId,formData) => {
    try{
        const response= await updateUserProfileApi(userId,formData)
        return response.data
    }catch(err){
        throw err?.response?.data || {message:"Profile update failed"}
    }
}


