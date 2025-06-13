import { getAllUserApi } from "../../api/admin/userApi";

export const getAllUserService= async(params) =>{
    try{
        const response= await getAllUserApi(params)
        return response.data
    }catch(err){
        throw err.response?.data || {message:"User fetched failed"}
        
    }
}