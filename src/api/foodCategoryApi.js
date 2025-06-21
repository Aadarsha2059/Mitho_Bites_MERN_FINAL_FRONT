import axios from "./api";

export const getAllCategoryApi = () => axios.get("/food/categories");
export const getFoodCategoryByIdApi = (id) => axios.get(`/food/categories/${id}`); 