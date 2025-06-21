import axios from "../api"

export const getAllProductApi= (params) => axios.get("/admin/product",{params})

export const createOneProductApi= (data) =>
    axios.post("/admin/product", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

