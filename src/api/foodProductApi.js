import axios from "./api";

export const getAllFoodProductsApi = (params) => axios.get("/products", { params });
export const getFoodProductByIdApi = (id) => axios.get(`/products/${id}`);
export const addProductReviewApi = (id, data) => axios.post(`/products/${id}/review`, data);
export const toggleFavoriteApi = (id) => axios.post(`/products/${id}/favorite`);
export const getUserFavoritesApi = () => axios.get("/favorites"); 
