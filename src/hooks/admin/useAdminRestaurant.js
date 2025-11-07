import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOneRestaurantService, deleteOneRestaurantService, getAllRestaurantService, getOneRestaurantService, updateOneRestaurantService } from "../../services/admin/restaurantService";
import { toast } from "react-toastify";

export const useAdminRestaurant = () => {
    const query = useQuery({
        queryKey: ["admin_restaurant"],
        queryFn: () => getAllRestaurantService()
    })
    const restaurants = query.data?.data || []
    return {
        ...query, restaurants
    }
}

export const useCreateRestaurant = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOneRestaurantService,
        onSuccess: () => {
            toast.success("Restaurant created")
            queryClient.invalidateQueries(["admin_restaurant"])
        },
        onError: (err) => {
            toast.error(err.message || "failed")
        }
    })
}

export const useGetOneRestaurant = (id) => {
    const query = useQuery({
        queryKey: ["admin_restaurant_detail"],
        queryFn: () => getOneRestaurantService(id),
        enabled: !!id,
        retry: false
    })
    const restaurant = query.data?.data || {}
    return {
        ...query, restaurant
    }
}

export const useUpdateOneRestaurant = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }) => updateOneRestaurantService(id, data),
        onSuccess: () => {
            toast.success("Restaurant updated")
            queryClient.invalidateQueries(["admin_restaurant"])
        },
        onError: (err) => {
            console.log(err)
            toast.error(err.message || "failed to update")
        }
    })
}

export const useDeleteOneRestaurant = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteOneRestaurantService,
        mutationKey: ["admin_restaurant_delete"],
        onSuccess: () => {
            toast.success("Restaurant deleted")
            queryClient.invalidateQueries(["admin_restaurant"])
        },
        onError: (err) => {
            toast.error(err.message || "delete failed ")
        }
    })
} 
