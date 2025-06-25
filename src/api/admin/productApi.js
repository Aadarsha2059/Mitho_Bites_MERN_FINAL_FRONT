import axios from "../api"

export const getAllProductApi= (params) => axios.get("/admin/product",{params})

export const createOneProductApi= (data) =>
    axios.post("/admin/product", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

export const deleteOneProductApi = (id) => axios.delete(`/admin/product/${id}`)

export const getOneProductApi = (id) => axios.get(`/admin/product/${id}`)

export const updateOneProductApi = (id, data) =>
    axios.put(`/admin/product/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

