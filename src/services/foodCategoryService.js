import { getAllCategoryApi } from "../api/foodCategoryApi";

export const getAllCategoryService = async () => {
    try {
        console.log('=== FOOD CATEGORY SERVICE DEBUG ===');
        console.log('Calling getAllCategoryApi...');
        
        const response = await getAllCategoryApi();
        
        console.log('API Response:', {
            status: response.status,
            statusText: response.statusText,
            hasData: !!response.data,
            data: response.data
        });
        
        if (response.data?.data) {
            console.log('Categories in response:', response.data.data.length);
            response.data.data.forEach((cat, index) => {
                console.log(`Category ${index + 1}:`, {
                    id: cat._id,
                    name: cat.name,
                    hasImage: !!cat.image,
                    image: cat.image,
                    hasFilepath: !!cat.filepath,
                    filepath: cat.filepath
                });
            });
        }
        
        return response.data;
    } catch (err) {
        console.error('Food Category Service Error:', err);
        console.error('Error response:', err.response?.data);
        throw err.response?.data || { message: "Failed to fetch categories" };
    }
}; 