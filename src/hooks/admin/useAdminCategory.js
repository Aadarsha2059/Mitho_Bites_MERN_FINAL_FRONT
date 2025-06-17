import {  useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import { createOneCategoryService, getAllCategoryService } from "../../services/admin/categoryService";
import { toast } from "react-toastify";

export const useAdminCategory = () => {
    const query = useQuery(
        {
            queryKey: ["admin_category"],
            queryFn: () => getAllCategoryService()
        }
    )
    const categories = query.data?.data || []
    return {
        ...query, categories
    }
}

export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOneCategoryService,
        onSuccess: () => {
            toast.success("category created")
            queryClient
                .invalidateQueries(["admin_category"])

            //refetch with the key
        },
        onError: (err) => {
            toast.error(err.message || "failed")
        }
    })
}