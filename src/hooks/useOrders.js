import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getUserOrdersService, 
    getOrderByIdService, 
    createOrderService, 
    cancelOrderService 
} from "../services/orderService";
import { toast } from "react-toastify";

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getUserOrdersService,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log('useOrders - Success:', data);
    },
    onError: (error) => {
      console.error('useOrders - Error:', error);
    }
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success('Order created successfully!');
    },
    onError: (error) => {
      console.error('Create order error:', error);
      toast.error(error.message || 'Failed to create order');
    }
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cancelOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success('Order cancelled successfully!');
    },
    onError: (error) => {
      console.error('Cancel order error:', error);
      toast.error(error.message || 'Failed to cancel order');
    }
  });
};

export const useOrderById = (orderId) => {
    const {
        data: orderData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrderByIdService(orderId),
        enabled: !!orderId,
        retry: 1
    });

    const order = orderData?.data || null;

    return {
        order,
        isLoading,
        error,
        refetch
    };
}; 
