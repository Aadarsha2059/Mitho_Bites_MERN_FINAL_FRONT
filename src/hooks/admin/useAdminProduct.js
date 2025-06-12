import { useQuery } from "@tanstack/react-query";
import { getAllProductService } from "../../services/admin/productService";

//get request -useQuery
//Post/Put/Delete -useMutation

export const useAdminProduct =() =>{
    const query=useQuery(
        {
            queryKey:["admin_product"], //key/variable to rerun function
            queryFn: () =>{
                return getAllProductService(
                    {} // params
                )
            },
            keepPreviousData:true // cache old data 
        }
    )
    const products=query.data?.data || []
    return {
        ...query,
        products
    }
}