import { getAllCategoryApi } from "../api/foodCategoryApi";

export const getAllCategoryService = async () => {
    try {
        const response = await getAllCategoryApi();
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to fetch categories" };
    }
}; 
