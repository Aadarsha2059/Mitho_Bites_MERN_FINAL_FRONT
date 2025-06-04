import { registerUserApi } from "../api/authApi";

export const registerUserService=async (formData) =>{
    try{
        const response = await registerUserApi(formData)
        return response.data // response bodhy
    }catch(err){
        throw err.response?.data || {message:"Registration failed"}
    }

}


