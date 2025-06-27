import axios from "./api";

export const getAllCategoryApi = () => axios.get("/categories");
export const getFoodCategoryByIdApi = (id) => axios.get(`/categories/${id}`); 