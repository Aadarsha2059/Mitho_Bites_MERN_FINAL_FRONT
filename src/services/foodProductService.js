import { getAllFoodProductsApi } from "../api/foodProductApi";

export const getAllFoodProductsService = async (params) => {
    try {
        const response = await getAllFoodProductsApi(params);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Food products fetch failed" };
    }
}; 
