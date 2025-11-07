import axios from "../api"

export const getAllRestaurantApi = () => axios.get("/admin/restaurant")

export const createOneRestaurantApi = (data) =>
    axios.post("/admin/restaurant", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

export const getOneRestaurantApi = (id) => 
    axios.get("/admin/restaurant/" + id)

export const updateOneRestaurantApi = (id, data) =>
    axios.put("/admin/restaurant/" + id, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

export const deleteOneRestaurantApi = (id) =>
    axios.delete("/admin/restaurant/" + id) 
