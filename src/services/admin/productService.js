import { getAllProductApi, createOneProductApi } from "../../api/admin/productApi";

export const getAllProductService= async (params) =>{
    try{
        const response = await getAllProductApi(params)
        return response.data
    }catch(err){
        throw err.response?.data || {message:"Product fetch failed"}  
     }
}

export const createOneProductService = async (data) => {
    try {
        const response = await createOneProductApi(data)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: "Failed to create product" }
    }
}
