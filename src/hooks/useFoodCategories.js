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
    
    // Enhanced debug logging
    console.log('=== FOOD CATEGORIES HOOK DEBUG ===');
    console.log('Query result:', {
        isLoading: query.isLoading,
        error: query.error,
        data: query.data,
        hasData: !!query.data,
        dataType: typeof query.data
    });
    console.log('Categories array:', {
        categories,
        length: categories.length,
        isArray: Array.isArray(categories),
        firstCategory: categories[0]
    });
    
    if (categories.length > 0) {
        console.log('Category details:');
        categories.forEach((cat, index) => {
            console.log(`Category ${index + 1}:`, {
                id: cat._id,
                name: cat.name,
                hasImage: !!cat.image,
                image: cat.image,
                hasFilepath: !!cat.filepath,
                filepath: cat.filepath
            });
        });
        
        // Log the first category in detail
        const firstCat = categories[0];
        console.log('=== FIRST CATEGORY DETAILED ===');
        console.log('ID:', firstCat._id);
        console.log('Name:', firstCat.name);
        console.log('Has image field:', !!firstCat.image);
        console.log('Image value:', firstCat.image);
        console.log('Has filepath field:', !!firstCat.filepath);
        console.log('Filepath value:', firstCat.filepath);
        console.log('All fields:', Object.keys(firstCat));
        console.log('Full object:', JSON.stringify(firstCat, null, 2));
    }
    
    return {
        ...query,
        categories
    };
}; 