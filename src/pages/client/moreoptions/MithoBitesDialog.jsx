import React from 'react';
import { FaTimes, FaUtensils, FaHeart, FaStar, FaLeaf } from 'react-icons/fa';

const MithoBitesDialog = ({ onClose }) => {
  const features = [
    {
      icon: <FaUtensils />,
      title: 'Fresh & Delicious',
      description: 'We serve only the freshest ingredients, prepared with love and care.',
      color: '#ff6f00'
    },
    {
      icon: <FaHeart />,
      title: 'Made with Love',
      description: 'Every dish is crafted with passion and attention to detail.',
      color: '#e53935'
    },
    {
      icon: <FaStar />,
      title: 'Premium Quality',
      description: 'We maintain the highest standards in food preparation and service.',
      color: '#ffb300'
    },
    {
      icon: <FaLeaf />,
      title: 'Healthy Options',
      description: 'We offer a wide variety of healthy and nutritious meal options.',
      color: '#43a047'
    }
  ];

  return (
    <div className="mitho-dialog-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.25)',
      zIndex: 3000
    }}>
      <div className="mitho-dialog" style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #fff3e0 100%)',
        borderRadius: '2.5rem',
        boxShadow: '0 16px 64px rgba(255, 111, 0, 0.2), 0 2px 12px rgba(0,0,0,0.1)',
        padding: '48px 56px',
        minWidth: '540px',
        maxWidth: '850px',
        width: '92vw',
        position: 'fixed',
        top: '56px',
        right: '50%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        zIndex: 3100,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '82vh',
        border: '2.5px solid #fff3e0',
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: 22,
            right: 38,
            background: '#fff',
            border: '2px solid #e53935',
            fontSize: '2.3rem',
            color: '#e53935',
            cursor: 'pointer',
            zIndex: 3200,
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(229,57,53,0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e53935';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#e53935';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <FaTimes />
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          marginBottom: '28px',
          justifyContent: 'center'
        }}>
          <FaUtensils style={{ fontSize: '2.7rem', color: '#ff6f00' }} />
          <h2 style={{
            margin: 0,
            fontWeight: 800,
            fontSize: '2.3rem',
            color: '#ff6f00',
            letterSpacing: '1.2px'
          }}>BhokBhoj</h2>
        </div>
        
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '1.1rem',
          marginBottom: '32px',
          fontWeight: 500,
          lineHeight: '1.6'
        }}>
          Welcome to BhokBhoj! Discover our amazing features and what makes us special.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          width: '100%',
          marginBottom: '24px'
        }}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                borderRadius: '1.5rem',
                padding: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                border: `2px solid ${feature.color}33`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${feature.color}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{
                fontSize: '3rem',
                color: feature.color,
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: feature.color,
                marginBottom: '12px',
                textAlign: 'center'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#666',
                textAlign: 'center',
                lineHeight: '1.5'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          width: '100%',
          background: '#fff',
          borderRadius: '1.7rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          padding: '28px 32px',
          marginTop: '8px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ff6f00',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Why Choose BhokBhoj?
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              'Fast and reliable delivery service',
              'Wide variety of cuisines and dishes',
              'Affordable prices with great value',
              'Easy ordering and payment options',
              '24/7 customer support',
              'Fresh ingredients and quality food'
            ].map((item, idx) => (
              <li key={idx} style={{
                padding: '12px 0',
                borderBottom: idx < 5 ? '1px solid #e0e0e0' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '1.05rem',
                color: '#333',
                fontWeight: 500
              }}>
                <span style={{ color: '#ff6f00', fontSize: '1.2rem' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MithoBitesDialog;

