import axios from "./api";

export const getAllFoodProductsApi = (params) => axios.get("/food/products", { params });
export const getFoodProductByIdApi = (id) => axios.get(`/food/products/${id}`);
export const addProductReviewApi = (id, data) => axios.post(`/food/products/${id}/review`, data);
export const toggleFavoriteApi = (id) => axios.post(`/food/products/${id}/favorite`);
export const getUserFavoritesApi = () => axios.get("/food/favorites"); 