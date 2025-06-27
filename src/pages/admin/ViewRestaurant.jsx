import React from "react";
import { useGetOneRestaurant } from "../../hooks/admin/useAdminRestaurant";
import { useParams } from "react-router-dom";
import "./ViewRestaurant.css";

export default function ViewRestaurant() {
  const { id } = useParams();
  const { restaurant, error, isPending } = useGetOneRestaurant(id);

  if (isPending) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-message">{error.message}</div>;

  return (
    <div className="view-restaurant-container">
      <h2 className="restaurant-title">Restaurant Details</h2>
      <div className="restaurant-card">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />
        <div className="restaurant-info">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <p className="restaurant-location">📍 {restaurant.location}</p>
          <p className="restaurant-contact">📞 {restaurant.contact}</p>
        </div>
      </div>
    </div>
  );
} 