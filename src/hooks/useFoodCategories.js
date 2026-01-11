import { useQuery } from "@tanstack/react-query";
import { getAllCategoryService } from "../services/foodCategoryService";

export const useFoodCategories = () => {
    const query = useQuery({
        queryKey: ["food_categories"],
        queryFn: () => getAllCategoryService(),
        retry: 2,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        onError: (error) => {
            console.error('❌ Error fetching categories:', error);
            if (error.code === 'ERR_NETWORK' || error.message?.includes('ECONNREFUSED')) {
                console.error('💡 Cannot connect to backend server. Please ensure it is running on port 5050');
            }
        }
    });
    
    const categories = query.data?.data || [];
    
    // Debug logging
    console.log('Food Categories Hook:', {
        isLoading: query.isLoading,
        error: query.error,
        data: query.data,
        categories: categories,
        categoriesCount: categories.length
    });
    
    return {
        ...query,
        categories
    };
}; 
