import { useQuery } from "@tanstack/react-query";
import { getAllProductService } from "../../services/admin/productService";
import { useState } from "react";

//get request -useQuery
//Post/Put/Delete -useMutation

export const useAdminProduct =() =>{
    const [pageNumber, setPageNumber]= useState(1)
    const [pageSize, setPageSize]=useState(10)
    const [search,setSearch] =useState("")

    const query=useQuery(
        {
            queryKey:["admin_product",pageNumber,pageSize,search], //key/variable to rerun function
            queryFn: () =>{
                return getAllProductService(
                    {
                        page:pageNumber,
                        limit:pageSize,
                        search:search
                    } // params
                )
            },
            keepPreviousData:true // cache old data 
        }
    )

    const products=query.data?.data || []
    const pagination=query.data?.pagination|| {
        page:1,
        totalPages:1,
        limit:10
    }
    const canPreviousPage= pagination.page >1
    const canNextPage=pagination.page < pagination.totalPages

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
        setSearch
    }
}