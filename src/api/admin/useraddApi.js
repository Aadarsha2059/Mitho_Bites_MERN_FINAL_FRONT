import axios from"../api"



export const createOneUserApi= (data) =>
    axios.post("/admin/users",data
)  //request using multer/file upload
