import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaClock, FaArrowRight } from "react-icons/fa";
import { useAdminRestaurant } from "../../../hooks/admin/useAdminRestaurant";
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

// Sample restaurants for demonstration (will be replaced by backend data)
const sampleRestaurants = [
  {
    _id: "rest1",
    name: "Rooftop Nepal",
    image: rooftopNepal,
    location: "Thamel, Kathmandu",
    contact: "+977-1-4444444",
    description: "Amazing rooftop dining with city views",
    rating: 4.8,
    status: "Open"
  },
  {
    _id: "rest2", 
    name: "Salone de Cafe",
    image: saloneCafe,
    location: "Baneshwor, Kathmandu",
    contact: "+977-1-5555555",
    description: "Cozy cafe with great coffee and food",
    rating: 4.6,
    status: "Open"
  },
  {
    _id: "rest3",
    name: "Your Own Restro",
    image: yourOwnRestro,
    location: "Durbar Marg, Kathmandu",
    contact: "+977-1-6666666",
    description: "Authentic Nepali cuisine",
    rating: 4.7,
    status: "Open"
  },
  {
    _id: "rest4",
    name: "Nezze Restro Nepal",
    image: nezzeRestro,
    location: "Patan, Lalitpur",
    contact: "+977-1-7777777",
    description: "Traditional and modern fusion",
    rating: 4.5,
    status: "Open"
  },
  {
    _id: "rest5",
    name: "Spice Garden",
    image: res1,
    location: "Kupondole, Lalitpur",
    contact: "+977-1-8888888",
    description: "Spicy and flavorful dishes",
    rating: 4.4,
    status: "Open"
  },
  {
    _id: "rest6",
    name: "Golden Plate",
    image: res2,
    location: "Jhamsikhel, Lalitpur",
    contact: "+977-1-9999999",
    description: "Premium dining experience",
    rating: 4.9,
    status: "Open"
  },
  {
    _id: "rest7",
    name: "Taste of Nepal",
    image: res3,
    location: "Boudha, Kathmandu",
    contact: "+977-1-1010101",
    description: "Authentic local flavors",
    rating: 4.3,
    status: "Open"
  },
  {
    _id: "rest8",
    name: "Urban Kitchen",
    image: rooftopNepal,
    location: "Maharajgunj, Kathmandu",
    contact: "+977-1-2020202",
    description: "Modern urban dining",
    rating: 4.6,
    status: "Open"
  },
  {
    _id: "rest9",
    name: "Himalayan Delights",
    image: saloneCafe,
    location: "Swayambhu, Kathmandu",
    contact: "+977-1-3030303",
    description: "Mountain-inspired cuisine",
    rating: 4.7,
    status: "Open"
  },
  {
    _id: "rest10",
    name: "Riverside Cafe",
    image: yourOwnRestro,
    location: "Bagmati, Kathmandu",
    contact: "+977-1-4040404",
    description: "Peaceful riverside dining",
    rating: 4.2,
    status: "Open"
  },
  {
    _id: "rest11",
    name: "Downtown Bistro",
    image: nezzeRestro,
    location: "New Road, Kathmandu",
    contact: "+977-1-5050505",
    description: "Contemporary bistro style",
    rating: 4.5,
    status: "Open"
  },
  {
    _id: "rest12",
    name: "Garden Restaurant",
    image: res1,
    location: "Garden of Dreams, Kathmandu",
    contact: "+977-1-6060606",
    description: "Beautiful garden setting",
    rating: 4.8,
    status: "Open"
  }
];

const RestaurantsSection = ({ onRestaurantClick }) => {
  console.log('RestaurantsSection rendered');
  
  // Use the same hook as admin restaurant management
  const { restaurants, isLoading, error } = useAdminRestaurant();
  
  console.log('Restaurants hook data:', { restaurants, isLoading, error });
  
  // Use backend data if available, otherwise use sample data for demonstration
  const displayRestaurants = restaurants && restaurants.length > 0 ? restaurants : sampleRestaurants;
  
  const handleRestaurantClick = (restaurant) => {
    if (onRestaurantClick) {
      onRestaurantClick(restaurant);
    }
  };

  // Show loading state
  if (isLoading) {
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
        </div>
      </section>
    );
  }

  console.log('Display restaurants:', displayRestaurants);
  console.log('Number of restaurants:', displayRestaurants.length);
  console.log('Grid layout: 4 restaurants per row on large screens, responsive breakpoints applied');

  if (displayRestaurants.length === 0) {
    return (
      <section className="section">
        <h2 className="section-title glow-text">Popular Restaurants</h2>
        <p className="section-subtitle">Discover amazing restaurants near you</p>
        <div className="empty-state">
          <p>No restaurants available at the moment.</p>
          <p>Please add some restaurants from the admin panel.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title glow-text">Popular Restaurants</h2>
      <p className="section-subtitle">Discover amazing restaurants near you</p>
      <div className="restaurants-grid">
        {displayRestaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="restaurant-card animated-card"
            onClick={() => handleRestaurantClick(restaurant)}
            style={{ cursor: 'pointer' }}
          >
            <div className="restaurant-image-container">
              <img
                src={restaurant.image || getRestaurantImage(restaurant.name)}
                alt={restaurant.name}
                className="restaurant-image"
                onError={(e) => {
                  console.log('Restaurant image failed to load:', restaurant.name);
                  e.target.src = getRestaurantImage(restaurant.name);
                }}
              />
              <div className="restaurant-overlay">
                <FaArrowRight className="arrow-icon" />
              </div>
            </div>
            <div className="restaurant-info">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <div className="restaurant-meta">
                <span className="restaurant-location">
                  <FaMapMarkerAlt /> {restaurant.location}
                </span>
                {restaurant.contact && (
                  <span className="restaurant-contact">
                    <FaPhoneAlt /> {restaurant.contact}
                  </span>
                )}
              </div>
              <div className="restaurant-status">
                <span className="status-open">
                  <FaClock /> {restaurant.status || 'Open Now'}
                </span>
                <span className="rating">
                  <FaStar /> {restaurant.rating || '4.5'}
                </span>
              </div>
              {restaurant.description && (
                <p className="restaurant-description">{restaurant.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RestaurantsSection; 