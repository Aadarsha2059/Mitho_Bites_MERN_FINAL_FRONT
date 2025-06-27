import { getAllProductApi, createOneProductApi, deleteOneProductApi, getOneProductApi, updateOneProductApi } from "../../api/admin/productApi";

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

export const deleteOneProductService = async (id) => {
    try {
        const response = await deleteOneProductApi(id)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: "Failed to delete product" }
    }
}

export const getOneProductService = async (id) => {
    try {
        const response = await getOneProductApi(id)
        return response.data
    } catch (err) {
        throw err.response?.data || { message: "Failed to fetch product" }
    }
}

export const updateOneProductService = async (id, data) => {
    try {
        const response = await updateOneProductApi(id, data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to update product" };
    }
}