import { createOneUserApi } from "../../api/admin/useraddApi"



export  const createOneUserService= async (data) =>{
    try{
        const response = await createOneUserApi(data)
        return response.data

    }catch(err){
        throw err.response?.data || {"message":"failed to create"}
    }
}
