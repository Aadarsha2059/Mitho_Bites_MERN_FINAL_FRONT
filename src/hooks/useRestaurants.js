import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/restaurant`);
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