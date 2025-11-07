import { useQuery } from "@tanstack/react-query";
import { getAllCategoryService } from "../services/foodCategoryService";

export const useFoodCategories = () => {
    const query = useQuery({
        queryKey: ["food_categories"],
        queryFn: () => getAllCategoryService(),
        retry: 3,
        refetchOnWindowFocus: false
    });
    
    const categories = query.data?.data || [];
    
    // Debug logging
    console.log('Food Categories Hook:', {
        isLoading: query.isLoading,
        error: query.error,
        data: query.data,
        categories: categories
    });
    
    return {
        ...query,
        categories
    };
}; 
