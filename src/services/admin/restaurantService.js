import { getAllRestaurantApi, createOneRestaurantApi, getOneRestaurantApi, updateOneRestaurantApi, deleteOneRestaurantApi } from "../../api/admin/restaurantApi";

export const getAllRestaurantService = async() => {
    try{
        const response = await getAllRestaurantApi()
        return response.data
    }catch(err){
        throw err.response?.data || {"message":"Failed to fetch"}
    }
}

export const createOneRestaurantService = async (data) => {
    try{
        const response = await createOneRestaurantApi(data)
        return response.data
    }catch(err){
        throw err.response?.data || {"message":"failed to create"}
    }
}

export const getOneRestaurantService = async (id) => {
    try{
        const response = await getOneRestaurantApi(id)
        return response.data
    }catch(err){
        throw err.response?.data || {"message":" Get failed"}
    }
}

export const updateOneRestaurantService = async (id,data) => {
    try{
        const response = await updateOneRestaurantApi(id,data)
        return response.data
    }catch(err){
        throw err.response?.data || {"message":"Update failed"}
    }
}

export const deleteOneRestaurantService = async (id) => {
    try{
        const response = await deleteOneRestaurantApi(id)
        return response.data
    }catch(err){
        throw err.response?.data || {"message":"delete failed"}
    }
} 