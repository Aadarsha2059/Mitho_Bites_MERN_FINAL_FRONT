import React from "react";
import { useAdminRestaurant } from "../../hooks/admin/useAdminRestaurant";
import { getBackendImageUrl } from "../../utils/backend-image";
import "./RestaurantManagement.css";

export default function RestaurantManagement() {
  const { restaurants, isLoading, error } = useAdminRestaurant();

  if (isLoading) return <div className="loader">Loading restaurants...</div>;
  if (error) return <div className="error-message">{error.message}</div>;

  return (
    <div className="restaurant-management-container">
      <h2 className="restaurant-management-title">Restaurant Management</h2>
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant-item">
            <img
              src={getBackendImageUrl(restaurant.filepath)}
              alt={restaurant.name}
              className="restaurant-item-image"
            />
            <div className="restaurant-item-info">
              <h3 className="restaurant-item-name">{restaurant.name}</h3>
              <p className="restaurant-item-location">📍 {restaurant.location}</p>
              <p className="restaurant-item-contact">📞 {restaurant.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 