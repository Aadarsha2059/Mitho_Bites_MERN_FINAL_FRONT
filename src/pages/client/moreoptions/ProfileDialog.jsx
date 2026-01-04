import React, { useContext, useState } from 'react';
import { FaTimes, FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserEdit } from 'react-icons/fa';
import { AuthContext } from '../../../auth/AuthProvider';
import UpdateProfile from '../UpdateProfile';

const ProfileDialog = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

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
        boxShadow: '0 16px 64px rgba(255, 152, 0, 0.2), 0 2px 12px rgba(0,0,0,0.1)',
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
          <FaUserCircle style={{ fontSize: '2.7rem', color: '#ff9800' }} />
          <h2 style={{
            margin: 0,
            fontWeight: 800,
            fontSize: '2.3rem',
            color: '#ff9800',
            letterSpacing: '1.2px'
          }}>Your Profile</h2>
        </div>
        
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '1.1rem',
          marginBottom: '28px',
          fontWeight: 500
        }}>View and manage your account information</p>

        {!user ? (
          <div style={{
            width: '100%',
            background: '#fff',
            borderRadius: '1.7rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            padding: '28px 32px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading user information...</p>
          </div>
        ) : (
          <>
            <div style={{
              width: '100%',
              background: '#fff',
              borderRadius: '1.7rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              padding: '28px 32px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff9800 0%, #ff6f00 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  boxShadow: '0 4px 16px rgba(255, 152, 0, 0.3)'
                }}>
                  <FaUserCircle style={{ fontSize: '60px', color: '#fff' }} />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px'
              }}>
                <div style={{
                  padding: '16px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <FaUserCircle style={{ color: '#ff9800', fontSize: '1.2rem' }} />
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#666' }}>Full Name</span>
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#333',
                    paddingLeft: '32px'
                  }}>
                    {user?.fullname || 'Not provided'}
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <FaUserCircle style={{ color: '#ff9800', fontSize: '1.2rem' }} />
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#666' }}>Username</span>
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#333',
                    paddingLeft: '32px'
                  }}>
                    {user?.username || 'Not provided'}
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <FaEnvelope style={{ color: '#ff9800', fontSize: '1.2rem' }} />
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#666' }}>Email Address</span>
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#333',
                    paddingLeft: '32px'
                  }}>
                    {user?.email || 'Not provided'}
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <FaPhone style={{ color: '#ff9800', fontSize: '1.2rem' }} />
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#666' }}>Phone Number</span>
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#333',
                    paddingLeft: '32px'
                  }}>
                    {user?.phone || 'Not provided'}
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <FaMapMarkerAlt style={{ color: '#ff9800', fontSize: '1.2rem' }} />
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: '#666' }}>Address</span>
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#333',
                    paddingLeft: '32px'
                  }}>
                    {user?.address || 'Not provided'}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowUpdateProfile(true)}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: 'linear-gradient(135deg, #ff9800 0%, #ff6f00 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 4px 16px rgba(255, 152, 0, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 152, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 152, 0, 0.3)';
              }}
            >
              <FaUserEdit /> Edit Profile
            </button>
          </>
        )}

        {showUpdateProfile && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 4000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '700px',
              width: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 16px 64px rgba(0,0,0,0.3)'
            }}>
              <button
                onClick={() => setShowUpdateProfile(false)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: '#fff',
                  border: '2px solid #e53935',
                  fontSize: '2rem',
                  color: '#e53935',
                  cursor: 'pointer',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease',
                  zIndex: 4100,
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
              <UpdateProfile onClose={() => setShowUpdateProfile(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDialog;

