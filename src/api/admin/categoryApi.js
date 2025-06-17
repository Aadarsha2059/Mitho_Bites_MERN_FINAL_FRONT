import axios from"../api"

export const getAllCategoryApi= () => axios.get("/admin/category")

export const createOneCategoryApi= (data) =>
    axios.post("/admin/category",data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    )  //request using multer/file upload