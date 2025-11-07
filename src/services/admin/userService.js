import { deleteOneUserApi, getAllUserApi, getOneUserApi, updateOneUserApi } from "../../api/admin/userApi";

export const getAllUserService= async(params) =>{
    try{
        const response= await getAllUserApi(params)
        return response.data
    }catch(err){
        throw err.response?.data || {message:"User fetched failed"}
        
    }
}

export const getOneUserService= async(id)=>{
    try{
        const response= await getOneUserApi(id)
        return response.data
    }catch(err){
        throw err.response?.data ||{"message":"Get failed"}
    }
}

export const updateOneUserService=async(id,data)=>{
    try{
        const response= await updateOneUserApi(id,data)
        return response.data
    }catch(err){
        throw err.response?.data ||{"message":"update failed"}
    }
}

export const deleteOneUserService=async(id)=>{
    try{
        const response = await deleteOneUserApi(id)
        return response.data
    }catch(err){
        throw err.response?.data || {"message":"delete failed"}
    }
}
