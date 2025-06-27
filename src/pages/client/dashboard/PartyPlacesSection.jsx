import React from "react";
import { FaMapMarkerAlt, FaUsers, FaStar, FaBirthdayCake } from "react-icons/fa";
import "../Dashboard.css";

// Use actual party place images from assets/party_palace
import bestparty from "../../../assets/party_palace/bestparty.png";
import taaj from "../../../assets/party_palace/taaj.png";
import smart from "../../../assets/party_palace/smart.png";
// Fallback images
import res1 from "../../../assets/res_1.png";
import res2 from "../../../assets/res_2.png";
import res3 from "../../../assets/res_3.png";

const partyPlaces = [
  {
    id: 1,
    name: "Best Party Palace",
    image: bestparty,
    location: "Thamel, Kathmandu",
    seats: "50-100 people",
    description: "Best place for birthday party",
    rating: 4.8,
    price: "Starting from Rs. 15,000"
  },
  {
    id: 2,
    name: "Taaj Celebration Center",
    image: taaj,
    location: "Baneshwor, Kathmandu",
    seats: "30-80 people",
    description: "Perfect for intimate celebrations",
    rating: 4.6,
    price: "Starting from Rs. 12,000"
  },
  {
    id: 3,
    name: "Smart Event Hub",
    image: smart,
    location: "Durbar Marg, Kathmandu",
    seats: "100-200 people",
    description: "Luxury venue for grand parties",
    rating: 4.9,
    price: "Starting from Rs. 25,000"
  },
  {
    id: 4,
    name: "Royal Garden Palace",
    image: res1,
    location: "Patan, Lalitpur",
    seats: "20-50 people",
    description: "Charming venue for small gatherings",
    rating: 4.5,
    price: "Starting from Rs. 8,000"
  },
  {
    id: 5,
    name: "Celebration Zone",
    image: res2,
    location: "Kupondole, Lalitpur",
    seats: "40-80 people",
    description: "Modern venue with great amenities",
    rating: 4.7,
    price: "Starting from Rs. 18,000"
  },
  {
    id: 6,
    name: "Golden Events",
    image: res3,
    location: "Jhamsikhel, Lalitpur",
    seats: "60-120 people",
    description: "Premium venue for special occasions",
    rating: 4.8,
    price: "Starting from Rs. 22,000"
  },
  {
    id: 7,
    name: "Party Paradise",
    image: bestparty,
    location: "Boudha, Kathmandu",
    seats: "25-60 people",
    description: "Cozy venue with garden view",
    rating: 4.4,
    price: "Starting from Rs. 10,000"
  },
  {
    id: 8,
    name: "Elite Celebration",
    image: taaj,
    location: "Maharajgunj, Kathmandu",
    seats: "80-150 people",
    description: "Luxurious venue for grand events",
    rating: 4.9,
    price: "Starting from Rs. 30,000"
  }
];

const PartyPlacesSection = () => {
  console.log('PartyPlacesSection rendered');
  
  return (
    <section className="section">
      <h2 className="section-title glow-text">Explore Party Places</h2>
      <p className="section-subtitle">Find the perfect venue for your special celebrations</p>
      
      <div className="party-places-grid">
        {partyPlaces.map((place) => (
          <div className="party-place-card animated-card" key={place.id}>
            <div className="party-place-image-container">
              <img 
                src={place.image} 
                alt={place.name} 
                className="party-place-image"
                onError={(e) => {
                  console.log('Party place image failed to load, using fallback:', place.name);
                  e.target.src = res1; // Fallback to res1
                }}
              />
              <div className="party-place-badge">
                <FaBirthdayCake /> Best for Parties
              </div>
            </div>
            
            <div className="party-place-content">
              <h3 className="party-place-name">{place.name}</h3>
              
              <div className="party-place-meta">
                <span className="party-place-location">
                  <FaMapMarkerAlt /> {place.location}
                </span>
                <span className="party-place-seats">
                  <FaUsers /> {place.seats}
                </span>
              </div>
              
              <p className="party-place-description">{place.description}</p>
              
              <div className="party-place-footer">
                <div className="party-place-rating">
                  <FaStar /> {place.rating}
                </div>
                <div className="party-place-price">
                  {place.price}
                </div>
              </div>
              
              <button className="party-place-btn">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartyPlacesSection; 