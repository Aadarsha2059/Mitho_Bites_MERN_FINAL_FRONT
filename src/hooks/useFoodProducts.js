import { useQuery } from "@tanstack/react-query";
import { getAllFoodProductsService } from "../services/foodProductService";
import { useState } from "react";

export const useFoodProducts = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortBy, setSortBy] = useState("name"); // name, price, rating
    const [sortOrder, setSortOrder] = useState("asc"); // asc, desc

    const query = useQuery({
        queryKey: ["food_products", pageNumber, pageSize, search, categoryFilter, sortBy, sortOrder],
        queryFn: () => {
            return getAllFoodProductsService({
                page: pageNumber,
                limit: pageSize,
                search: search,
                category: categoryFilter,
                sortBy: sortBy,
                sortOrder: sortOrder
            });
        },
        keepPreviousData: true,
        retry: 2,
        retryDelay: 1000,
        onError: (error) => {
            console.error('❌ Error fetching products:', error);
            if (error.code === 'ERR_NETWORK' || error.message?.includes('ECONNREFUSED')) {
                console.error('💡 Cannot connect to backend server. Please ensure it is running on port 5050');
            }
        }
    });

    const products = query.data?.data || [];
    const pagination = query.data?.pagination || {
        page: 1,
        totalPages: 1,
        limit: 12
    };
    
    const canPreviousPage = pagination.page > 1;
    const canNextPage = pagination.page < pagination.totalPages;

    // Debug logging
    console.log('Food Products Hook:', {
        isLoading: query.isLoading,
        error: query.error,
        data: query.data,
        products: products,
        pagination: pagination
    });

    return {
        ...query,
        products,
        pageNumber,
        setPageNumber,
        pagination,
        canNextPage,
        canPreviousPage,
        pageSize,
        setPageSize,
        search,
        setSearch,
        categoryFilter,
        setCategoryFilter,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder
    };
}; 
