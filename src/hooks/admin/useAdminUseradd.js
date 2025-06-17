import {  useMutation,  useQueryClient} from "@tanstack/react-query";

import { createOneUserService } from "../../services/admin/userAddService"; 
import { toast } from "react-toastify";


export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOneUserService,

        onSuccess: () => {
            toast.success("user created")
            queryClient
                .invalidateQueries(["admin_user"])

            //refetch with the key
        },
        onError: (err) => {
            toast.error(err.message || "failed")
        }
    })
}