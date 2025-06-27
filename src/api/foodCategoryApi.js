import axios from "./api";

const getAllCategoryApi = async () => {
    console.log('=== FOOD CATEGORY API DEBUG ===');
    console.log('Making request to /categories');
    console.log('Base URL:', axios.defaults.baseURL);
    
    try {
        const response = await axios.get("/categories");
        console.log('API call successful:', {
            status: response.status,
            url: response.config.url,
            hasData: !!response.data
        });
        return response;
    } catch (error) {
        console.error('API call failed:', {
            status: error.response?.status,
            url: error.config?.url,
            message: error.message,
            data: error.response?.data
        });
        throw error;
    }
};

export { getAllCategoryApi };
export const getFoodCategoryByIdApi = (id) => axios.get(`/categories/${id}`); 