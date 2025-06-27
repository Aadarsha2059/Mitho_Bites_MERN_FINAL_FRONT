import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaClock } from "react-icons/fa";
import { useRestaurants } from "../../../hooks/useRestaurants";
import { getBackendImageUrl } from "../../../utils/backend-image";
import "../Dashboard.css";

// Import restaurant images from assets/restaurant folder
import rooftopNepal from "../../../assets/restaurant/rooftoppnepal.png";
import saloneCafe from "../../../assets/restaurant/salone de cafe.png";
import yourOwnRestro from "../../../assets/restaurant/your own restro.png";
import nezzeRestro from "../../../assets/restaurant/nezze restro nepal.png";

// Fallback images from main assets
import res1 from "../../../assets/res_1.png";
import res2 from "../../../assets/res_2.png";
import res3 from "../../../assets/res_3.png";

// Map restaurant names to static images
const getRestaurantImage = (restaurantName) => {
  const name = restaurantName.toLowerCase();
  
  if (name.includes('rooftop') || name.includes('rooftoppnepal')) {
    return rooftopNepal;
  } else if (name.includes('salon') || name.includes('cafe') || name.includes('salone')) {
    return saloneCafe;
  } else if (name.includes('your own') || name.includes('your own restro')) {
    return yourOwnRestro;
  } else if (name.includes('nezze') || name.includes('restro nepal')) {
    return nezzeRestro;
  } else {
    // Return a fallback image based on restaurant ID or name
    const fallbackImages = [res1, res2, res3];
    const index = restaurantName.length % fallbackImages.length;
    return fallbackImages[index];
  }
};

const RestaurantsSection = ({ onRestaurantClick }) => {
  console.log('=== RestaurantsSection Component Rendered ===');
  
  // Use the public restaurant hook
  const { data: restaurantsData, isLoading, error } = useRestaurants();
  
  console.log('Restaurants hook result:', { 
    data: restaurantsData, 
    isLoading, 
    error,
    hasData: !!restaurantsData,
    dataType: typeof restaurantsData
  });
  
  const restaurants = restaurantsData?.data || [];
  
  console.log('Processed restaurants array:', {
    restaurants,
    length: restaurants.length,
    isArray: Array.isArray(restaurants),
    firstRestaurant: restaurants[0]
  });
  
  const handleRestaurantClick = (restaurant) => {
    console.log('Restaurant clicked:', restaurant);
    if (onRestaurantClick) {
      onRestaurantClick(restaurant);
    }
  };

  // Function to get restaurant image URL - handles both old and new formats
  const getRestaurantImageUrl = (restaurant) => {
    // If backend provides transformed image URL, use it
    if (restaurant.image) {
      console.log('Using transformed image URL:', restaurant.image);
      return restaurant.image;
    }
    
    // If backend provides filepath, construct URL
    if (restaurant.filepath) {
      const imageUrl = getBackendImageUrl(restaurant.filepath);
      console.log('Constructed image URL from filepath:', imageUrl);
      return imageUrl;
    }
    
    // Fallback to static image based on name
    const fallbackImage = getRestaurantImage(restaurant.name);
    console.log('Using fallback image:', fallbackImage);
    return fallbackImage;
  };

  // Show loading state
  if (isLoading) {
    console.log('Showing loading state');
    return (
      <section className="section">
        <h2 className="section-title glow-text">Popular Restaurants</h2>
        <div className="loading-container">
          <div className="loader">Loading restaurants...</div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    console.error('Restaurants error:', error);
    return (
      <section className="section">
        <h2 className="section-title glow-text">Popular Restaurants</h2>
        <div className="error-container">
          <p>Error loading restaurants. Please try again later.</p>
          <p>Error: {error.message}</p>
          <p>Status: {error.response?.status}</p>
          <p>Data: {JSON.stringify(error.response?.data)}</p>
        </div>
      </section>
    );
  }

  console.log('About to render restaurants. Count:', restaurants.length);

  if (restaurants.length === 0) {
    console.log('No restaurants found, showing empty state');
    return (
      <section className="section">
        <h2 className="section-title glow-text">Popular Restaurants</h2>
        <p className="section-subtitle">Discover amazing restaurants near you</p>
        <div className="empty-state">
          <p>No restaurants available at the moment.</p>
          <p>Please add some restaurants from the admin panel.</p>
          <p>Debug: restaurantsData = {JSON.stringify(restaurantsData)}</p>
        </div>
      </section>
    );
  }

  console.log('Rendering restaurants grid with', restaurants.length, 'restaurants');

  return (
    <section className="section">
      <h2 className="section-title glow-text">Popular Restaurants</h2>
      <p className="section-subtitle">Discover amazing restaurants near you</p>
      
      <div className="categories-row restaurants-grid">
        {restaurants.map((restaurant, index) => {
          console.log(`Rendering restaurant ${index}:`, restaurant);
          const imageUrl = getRestaurantImageUrl(restaurant);
          
          return (
            <div 
              className="category-card animated-card restaurant-card" 
              key={restaurant._id}
              onClick={() => handleRestaurantClick(restaurant)}
              style={{ cursor: "pointer" }}
            >
              <img 
                src={imageUrl} 
                alt={restaurant.name} 
                className="category-image"
                onError={(e) => {
                  console.log('Image error for restaurant:', restaurant.name);
                  e.target.src = getRestaurantImage(restaurant.name);
                }}
              />
              <h3 className="category-title">{restaurant.name}</h3>
              <div className="restaurant-meta">
                <span className="restaurant-location">
                  <FaMapMarkerAlt /> {restaurant.location}
                </span>
                <span className="restaurant-contact">
                  <FaPhoneAlt /> {restaurant.contact}
                </span>
              </div>
              <div className="restaurant-status">
                <span className="status-open">
                  <FaClock /> Open Now
                </span>
                <span className="rating">
                  <FaStar /> 4.5
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RestaurantsSection; 