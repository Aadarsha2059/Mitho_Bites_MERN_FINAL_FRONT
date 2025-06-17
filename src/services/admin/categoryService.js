import { getAllCategoryApi, createOneCategoryApi } from "../../api/admin/categoryApi";

export const getAllCategoryService= async() =>{
    try{
        const response = await getAllCategoryApi()
        return response.data

    }catch(err){
        throw err.response?.data || {"message":"Failed to fetch"}
    }
}

export  const createOneCategoryService= async (data) =>{
    try{
        const response = await createOneCategoryApi(data)
        return response.data

    }catch(err){
        throw err.response?.data || {"message":"failed to create"}
    }
}