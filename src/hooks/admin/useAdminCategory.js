import {  useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import { createOneCategoryService, deleteOneCategoryService, getAllCategoryService,getOneCategoryService,updateOneCategoryService } from "../../services/admin/categoryService";
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



export const useGetOneCategory= (id) =>{
    const query= useQuery(
        {
            queryKey: ["admin_category_detail"],
            queryFn: () => getOneCategoryService(id),
            enabled: !!id,
            retry:false // default 3 retries
        }
    )
    const category= query.data?.data || {}
    return{
        ...query,category
    }
        

}

//id="123" -> !!id true
// id=undefined, id=null, -> !!id false

export const useUpdateOneCategory= () =>{
    const queryClient=useQueryClient()
    return useMutation(
        {
            mutationFn:({id,data}) =>
                updateOneCategoryService(id,data),
            onSuccess: () =>{
                toast.success("Category updated")
                queryClient.invalidateQueries(["admin_category"])
            },
            onError: (err) =>{
                console.log(err)
                toast.error(err.message || "failed to update")
            }
        }
    )
}

export const useDeleteOneCategory =() =>{
    const queryClient=useQueryClient()
    return useMutation(
        {
            mutationFn: deleteOneCategoryService,
            mutationKey:["admin_category_delete"],
            onSuccess: () =>{
                toast.success("Category deleted")
                queryClient.invalidateQueries(["admin_category"])
            },
            onError: (err) =>{
                toast.error(err.message || "delete failed ")
            }
        }
    )
}
