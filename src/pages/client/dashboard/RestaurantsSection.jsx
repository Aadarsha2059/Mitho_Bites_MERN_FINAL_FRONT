import React from "react";
import res1 from "../../../assets/res_1.png";
import res2 from "../../../assets/res_2.png";
import res3 from "../../../assets/res_3.png";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "../Dashboard.css";

const popularRestaurants = [
  { id: 1, name: "Momo House", image: res1, location: "Kathmandu, Nepal", contact: "+977-9800000001" },
  { id: 2, name: "Chowmein Express", image: res2, location: "Lalitpur, Nepal", contact: "+977-9800000002" },
  { id: 3, name: "Thakali Kitchen", image: res3, location: "Bhaktapur, Nepal", contact: "+977-9800000003" },
];

const RestaurantsSection = () => (
  <section className="section">
    <h2 className="section-title glow-text">Restaurants</h2>
    <div className="categories-row">
      {popularRestaurants.map((res) => (
        <div className="category-card animated-card restaurant-card" key={res.id}>
          <img src={res.image} alt={res.name} className="category-image" />
          <h3 className="category-title">{res.name}</h3>
          <div className="restaurant-meta">
            <span className="restaurant-location"><FaMapMarkerAlt /> {res.location}</span>
            <span className="restaurant-contact"><FaPhoneAlt /> {res.contact}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default RestaurantsSection; 