import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/authProvider';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#d32f2f',
        textAlign: 'center'
      }}>
        <h2>🚫 Access Denied</h2>
        <p>You don't have permission to access the admin area.</p>
        <p>Please contact the administrator if you believe this is an error.</p>
        <button 
          onClick={() => window.history.back()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return children;
};

export default AdminRoute; 