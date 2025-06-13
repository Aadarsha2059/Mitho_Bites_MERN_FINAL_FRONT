import { useQuery } from "@tanstack/react-query";
import { getAllUserService } from "../../services/admin/userService";
import { useState } from "react";



//get request -useQuery
//Post/Put/Delete -useMutation

export const useAdminUser =() =>{
    const [pageNumber, setPageNumber]= useState(1)
    const [pageSize, setPageSize]=useState(10)
    const [search,setSearch] =useState("")

    const query=useQuery(
        {
            queryKey:["admin_user",pageNumber,pageSize,search], //key/variable to rerun function
            queryFn: () =>{
                return getAllUserService(
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

    const users=query.data?.data || []
    const pagination=query.data?.pagination|| {
        page:1,
        totalPages:1,
        limit:10
    }
    const canPreviousPage= pagination.page >1
    const canNextPage=pagination.page < pagination.totalPages

    return {
        ...query,
        users,
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