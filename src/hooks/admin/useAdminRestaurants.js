import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const fetchAdminRestaurants = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/restaurant`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

const createRestaurantApi = async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/restaurant`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
};

const updateRestaurantApi = async ({ id, data }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/restaurant/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw error;
  }
};

const deleteRestaurantApi = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/restaurant/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
};

export const useAdminRestaurants = (params = {}) => {
  const queryClient = useQueryClient();

  const {
    data: restaurantsData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['admin-restaurants', params],
    queryFn: () => fetchAdminRestaurants(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const restaurants = restaurantsData?.data || [];
  const pagination = restaurantsData?.pagination || {
    page: 1,
    totalPages: 1,
    limit: 10
  };

  const createRestaurantMutation = useMutation({
    mutationFn: createRestaurantApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-restaurants']);
      toast.success('Restaurant created successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to create restaurant');
    }
  });

  const updateRestaurantMutation = useMutation({
    mutationFn: updateRestaurantApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-restaurants']);
      toast.success('Restaurant updated successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update restaurant');
    }
  });

  const deleteRestaurantMutation = useMutation({
    mutationFn: deleteRestaurantApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-restaurants']);
      toast.success('Restaurant deleted successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to delete restaurant');
    }
  });

  const createRestaurant = (data) => {
    createRestaurantMutation.mutate(data);
  };

  const updateRestaurant = (id, data) => {
    updateRestaurantMutation.mutate({ id, data });
  };

  const deleteRestaurant = (id) => {
    deleteRestaurantMutation.mutate(id);
  };

  return {
    restaurants,
    pagination,
    isLoading,
    error,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    refetch,
    isCreatingRestaurant: createRestaurantMutation.isLoading,
    isUpdatingRestaurant: updateRestaurantMutation.isLoading,
    isDeletingRestaurant: deleteRestaurantMutation.isLoading
  };
};

// Default export as backup
export default useAdminRestaurants; 