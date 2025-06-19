import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUserService,getOneUserService,deleteOneUserService,updateOneUserService } from "../../services/admin/userService";
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

export const useGetOneUser=(id)=>{
    const query=useQuery(
        {
        queryKey: ["admin_user_detail"],
        queryFn: ()=> getOneUserService(id),
        enabled: !!id,
        retry:false
        }
    )
    const users=query.data?.data || {}
    return {
        ...query,users
    }
}

export const useUpdateOneUser=()=>{
    const queryClient=useQueryClient()
    return useMutation(
        {
            mutationFn:({id,data})=>
                updateOneUserService(id,data),
            onSuccess: () =>{
                toast.onSuccess("User updated")
                queryClient.invalidateQueries(["admin_user"])
            },
            onError: (err) =>{
                console.log(err)
                toast.error(err.message || "failed to update user")
            }
        }
    )
}

export const useDeleteOneUser=() =>{
    const queryClient=useQueryClient()
    return useMutation(
        {
            mutationFn: deleteOneUserService,
            mutationKey:["admin_user_delete"],
            onSuccess: () =>{
                toast.onSuccess("user deleted")
                queryClient.invalidateQueries(["admin_user"])
            },
            onError: (err)=>{
                toast.error(err.message || "delete failed")
            }

        }
    )
}