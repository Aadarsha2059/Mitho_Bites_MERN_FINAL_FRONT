import { useQuery } from '@tanstack/react-query';
import api from '../api/api';

const fetchRestaurants = async () => {
  try {
    // ✅ FIXED: Use centralized API instance
    const response = await api.get('/restaurants');
    console.log('Restaurants API response:', response.data);
    
    // Ensure response has the expected structure
    if (response.data && response.data.success) {
      return response.data;
    } else if (Array.isArray(response.data)) {
      // Handle case where API returns array directly
      return {
        success: true,
        data: response.data
      };
    } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
      // Handle case where data is nested
      return {
        success: true,
        data: response.data.data
      };
    } else {
      console.warn('Unexpected restaurants response format:', response.data);
      return {
        success: true,
        data: []
      };
    }
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    console.error('Error response:', error.response?.data);
    // Return empty data structure instead of throwing to prevent UI crash
    return {
      success: false,
      data: [],
      error: error.response?.data?.message || error.message
    };
  }
};

export const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2, // Retry failed requests
    retryDelay: 1000, // Wait 1 second between retries
    onError: (error) => {
      console.error('❌ useRestaurants hook error:', error);
      if (error.code === 'ERR_NETWORK' || error.message?.includes('ECONNREFUSED')) {
        console.error('💡 Cannot connect to backend server. Please ensure it is running on port 5050');
      }
    }
  });
}; 
