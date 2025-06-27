import { useQuery } from '@tanstack/react-query';
import axios from '../api/api';

const fetchRestaurants = async () => {
  try {
    console.log('Fetching restaurants from API');
    const response = await axios.get('/restaurants');
    console.log('Restaurants API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    console.error('Error response:', error.response?.data);
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