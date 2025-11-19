import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getUserOrdersService, 
    getOrderByIdService, 
    createOrderService, 
    cancelOrderService 
} from "../services/orderService";
import { toast } from "react-toastify";

export const useOrders = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: getUserOrdersService,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  return {
    orders: data?.data || [],
    isLoading,
    error,
    refetch
  };
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['cart']);
      toast.success('Order placed successfully!');
      // Redirect to orders page after 1 second
      setTimeout(() => {
        window.location.href = '/orders';
      }, 1000);
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

export const useMarkOrderReceived = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderId) => {
      const axios = require('../api/api').default;
      return axios.put(`/orders/${orderId}/received`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success('Order marked as received! Bill sent to your email.');
    },
    onError: (error) => {
      console.error('Mark order received error:', error);
      toast.error(error.message || 'Failed to mark order as received');
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
