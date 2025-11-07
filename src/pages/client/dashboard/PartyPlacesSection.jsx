import React, { useState } from "react";
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
  const [showDialog, setShowDialog] = useState(false);

  const handleBookNow = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

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
              
              <button className="party-place-btn" onClick={handleBookNow}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {showDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.45)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Festive animated background elements - now cover the full overlay, not just the dialog */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 1,
          }}>
            {/* Balloons - more and varied */}
            {[10,20,30,40,50,60,70,80,90].map((left, i) => (
              <div key={'balloon'+i} style={{ position: 'absolute', left: `${left}%`, top: `${70 + (i%3)*10}%`, animation: `balloonUp ${5 + (i%4)}s ${(i%5)*0.7}s infinite linear`, zIndex: 2 }}>
                <span role="img" aria-label="balloon" style={{ fontSize: 36 + (i%3)*12 }}>{['🎈','🎈','🎈','🎈','🎈','🎈','🎈','🎈','🎈','🎈'][i%10]}</span>
              </div>
            ))}
            {/* Confetti - more and varied */}
            {[15,25,35,45,55,65,75,85].map((left, i) => (
              <div key={'confetti'+i} style={{ position: 'absolute', left: `${left}%`, top: `${5 + (i%4)*5}%`, zIndex: 2, animation: `confettiFall ${4 + (i%3)}s ${(i%4)*0.5}s infinite linear` }}>{['🎉','🎊','✨','🎉','🎊','✨','🎉','🎊'][i%8]}</div>
            ))}
            {/* Dizzling lights - more and varied */}
            {[12,28,44,60,76,88].map((left, i) => (
              <div key={'light'+i} style={{ position: 'absolute', left: `${left}%`, top: 0, width: 40, height: 40, zIndex: 2, filter: 'blur(1px)' }}>
                <span style={{ fontSize: 28 + (i%2)*8, color: ['#ffe066','#ffd700','#fff700','#fffbe0','#fff200','#ffe066'][i%6], animation: `dizzle ${1.2 + (i%3)*0.4}s ${(i%4)*0.3}s infinite alternate` }}>💡</span>
              </div>
            ))}
            {/* Dropping stars */}
            {[18,32,48,62,78,88].map((left, i) => (
              <div key={'star'+i} style={{ position: 'absolute', left: `${left}%`, top: '-5%', zIndex: 2, animation: `starDrop ${3.5 + (i%3)*0.7}s ${(i%4)*0.6}s infinite linear` }}>
                <span role="img" aria-label="star" style={{ fontSize: 28 + (i%2)*8, color: '#ffd700', filter: 'drop-shadow(0 0 6px #fffbe0)' }}>⭐</span>
              </div>
            ))}
            <style>{`
              @keyframes balloonUp {
                0% { transform: translateY(0); opacity: 1; }
                80% { opacity: 1; }
                100% { transform: translateY(-90vh); opacity: 0; }
              }
              @keyframes confettiFall {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(80vh); opacity: 0; }
              }
              @keyframes dizzle {
                0% { filter: brightness(1); }
                100% { filter: brightness(2.5); }
              }
              @keyframes starDrop {
                0% { transform: translateY(0); opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(90vh); opacity: 0; }
              }
            `}</style>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #fffbe0 0%, #ffe0f7 50%, #e0f7fa 100%)',
            borderRadius: 20,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            padding: '2.5rem 2rem 2rem 2rem',
            minWidth: 340,
            maxWidth: '90vw',
            position: 'relative',
            textAlign: 'center',
            fontFamily: 'inherit',
            border: '2px solid #f7c8ff',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            left: '0',
            right: '0',
            margin: '0 auto',
            transform: 'none',
          }}>
            <button
              onClick={handleCloseDialog}
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 28,
                color: '#888',
                cursor: 'pointer',
                fontWeight: 600,
                lineHeight: 1,
              }}
              aria-label="Close dialog"
            >
              &times;
            </button>
            <h3 style={{
              marginBottom: 12,
              color: '#2d2d2d',
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: 0.2,
            }}>
              Drop your bookings to our admin:
            </h3>
            <div style={{
              background: '#f7f7fa',
              borderRadius: 10,
              padding: '1.2rem 1rem',
              marginBottom: 18,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'inline-block',
              minWidth: 260,
            }}>
              <div style={{ fontWeight: 600, fontSize: 18, color: '#3a3a3a', marginBottom: 4 }}>
                Aadarsha Babu Dhakal
              </div>
              <div style={{ fontSize: 15, color: '#444', marginBottom: 2 }}>
                <span style={{ fontWeight: 500 }}>Email:</span> <a href="mailto:aadarsha12345@gmail.com" style={{ color: '#2d6cdf', textDecoration: 'none' }}>aadarsha12345@gmail.com</a>
              </div>
              <div style={{ fontSize: 15, color: '#444' }}>
                <span style={{ fontWeight: 500 }}>Contact:</span> <a href="tel:9800000000" style={{ color: '#2d6cdf', textDecoration: 'none' }}>9800000000</a>
              </div>
            </div>
            <div style={{ color: '#555', fontSize: 15, marginTop: 2, marginBottom: 0 }}>
              Our team will get in touch with you to confirm your booking and discuss further details.<br/>
              <span style={{ color: '#2d6cdf', fontWeight: 500 }}>Thank you for choosing us for your special occasion!</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PartyPlacesSection; 
