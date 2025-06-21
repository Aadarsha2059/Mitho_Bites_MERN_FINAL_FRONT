import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin_aadarsha',
    password: 'admin_password'
  };

  // Check if user is admin
  const checkIsAdmin = (userData) => {
    return userData && userData.username === ADMIN_CREDENTIALS.username;
  };

  // Login function
  const login = (userData, token) => {
    setLoading(true);
    
    // Check if this is an admin user
    const adminStatus = checkIsAdmin(userData);
    
    // Add admin flag to user data
    const userWithRole = {
      ...userData,
      isAdmin: adminStatus,
      role: adminStatus ? 'admin' : 'user'
    };
    
    // Store in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userWithRole));
    
    // Update state
    setUser(userWithRole);
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
    setLoading(false);
    
    console.log('User logged in:', userWithRole);
  };

  // Logout function
  const logout = () => {
    setLoading(true);
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setLoading(false);
    
    console.log('User logged out');
  };

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          
          // Re-check admin status
          const adminStatus = checkIsAdmin(userData);
          const userWithRole = {
            ...userData,
            isAdmin: adminStatus,
            role: adminStatus ? 'admin' : 'user'
          };
          
          setUser(userWithRole);
          setIsAuthenticated(true);
          setIsAdmin(adminStatus);
          
          console.log('User restored from localStorage:', userWithRole);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          logout();
        }
      } else {
        // No stored auth data, ensure clean state
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Context value
  const value = {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    setUser,
    // Additional helper functions
    getUserName: () => user?.username || 'Guest',
    getUserRole: () => user?.role || 'guest',
    isUserAdmin: () => isAdmin,
    hasValidToken: () => {
      const token = localStorage.getItem('token');
      return !!token;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context for direct use if needed
export { AuthContext };

export default AuthProvider; 