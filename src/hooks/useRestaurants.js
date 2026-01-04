import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRestaurants = async () => {
  try {
    // ✅ FIXED: Use public endpoint instead of admin endpoint
    const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5050'}/api/restaurants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}; 
