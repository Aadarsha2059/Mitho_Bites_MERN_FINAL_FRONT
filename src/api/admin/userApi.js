import axios from "../api"

export const getAllUserApi= (params) => axios.get("/admin/users",{params})


