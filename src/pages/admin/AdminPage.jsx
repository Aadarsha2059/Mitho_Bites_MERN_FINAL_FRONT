import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';
import {
  FaFacebook,
  FaLinkedin,
  FaPlus,
  FaUtensils,
  FaUsersCog,
  FaCog,
  FaSignOutAlt,
  FaListAlt,
  FaListUl,
} from 'react-icons/fa';
import adminFood from '../../assets/admin/adminfood.png';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('addProduct');
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [showDialog, setShowDialog] = useState(true);
  const [showRestaurantDialog, setShowRestaurantDialog] = useState(false);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    filepath: '',
    price: '',
    categoryId: '',
    type: '',
    restaurant: '',
  });

  useEffect(() => {
    setCategories([
      { _id: '1', name: 'Snacks' },
      { _id: '2', name: 'Meals' },
      { _id: '3', name: 'Desserts' },
      { _id: '4', name: 'Drinks' },
      { _id: '5', name: 'Combo Offers' },
    ]);
    setSellers([
      { _id: 'u1', name: 'Seller One' },
      { _id: 'u2', name: 'Seller Two' },
      { _id: 'u3', name: 'FastBite Vendor' },
      { _id: 'u4', name: 'TasteHub' },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Food product added (submit logic to backend goes here)');
  };

  const handleFetchProducts = () => {
    navigate('/admin/product');
  };

  const handleFetchUsers = () => {
    navigate('/admin/users');
  };

  const handleCreateUser = () => {
    setShowUserDialog(false);
    navigate('/admin/users/create');
  };

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false);
    navigate('/');
  };

  const handleAddCategory = () => {
    setShowCategoryDialog(false);
    navigate('/admin/category/create');
  };

  const handleGetCategories = () => {
    setShowCategoryDialog(false);
    navigate('/admin/category');
  };

  return (
    <div className="admin-container" style={{ backgroundImage: `url(${adminFood})` }}>
      {showDialog && (
        <div className="admin-dialog">
          <div className="admin-dialog-content">
            <button className="admin-dialog-close" onClick={() => setShowDialog(false)}>×</button>
            <h3>Admin Access Only</h3>
            <p>You must be an administrator to access this dashboard.</p>
          </div>
        </div>
      )}

      {showRestaurantDialog && (
        <div className="admin-dialog">
          <div className="admin-dialog-content">
            <button className="admin-dialog-close" onClick={() => setShowRestaurantDialog(false)}>×</button>
            <h3>Restaurant Management</h3>
            <button className="dialog-button">Add Restaurant</button>
            <button className="dialog-button">Fetch Restaurants</button>
          </div>
        </div>
      )}

      {showUserDialog && (
        <div className="admin-dialog">
          <div className="admin-dialog-content">
            <button className="admin-dialog-close" onClick={() => setShowUserDialog(false)}>×</button>
            <h3>User Management</h3>
            <button className="dialog-button" onClick={handleFetchUsers}>Fetch Users</button>
            <button className="dialog-button" onClick={handleCreateUser}>Handle Users</button>
          </div>
        </div>
      )}

      {showLogoutDialog && (
        <div className="admin-dialog">
          <div className="admin-dialog-content">
            <button className="admin-dialog-close" onClick={() => setShowLogoutDialog(false)}>×</button>
            <h3>😢 Are you sure you want to logout?</h3>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="dialog-button" onClick={handleLogoutConfirm}>Yes</button>
              <button className="dialog-button" onClick={() => setShowLogoutDialog(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {showCategoryDialog && (
        <div className="admin-dialog">
          <div className="admin-dialog-content">
            <button className="admin-dialog-close" onClick={() => setShowCategoryDialog(false)}>×</button>
            <h3>Category Management</h3>
            <button className="dialog-button" onClick={handleAddCategory}>Add Categories</button>
            <button className="dialog-button" onClick={handleGetCategories}>Get Categories</button>
          </div>
        </div>
      )}

      <header className="admin-header">🍽️ Mitho-Bites Admin Dashboard</header>

      <div className="admin-body">
        <nav className="admin-sidebar">
          <button className={activeTab === 'addProduct' ? 'active' : ''} onClick={() => setActiveTab('addProduct')}>
            <FaPlus style={{ marginRight: '8px' }} />
            Add Food Product
          </button>
          <button
            className={activeTab === 'addRestaurant' ? 'active' : ''}
            onClick={() => {
              setActiveTab('addRestaurant');
              setShowRestaurantDialog(true);
            }}
          >
            <FaUtensils style={{ marginRight: '8px' }} />
            Add Restaurant
          </button>
          <button
            className={activeTab === 'categories' ? 'active' : ''}
            onClick={() => {
              setActiveTab('categories');
              setShowCategoryDialog(true);
            }}
          >
            <FaListUl style={{ marginRight: '8px' }} />
            Categories
          </button>
          <button
            className={activeTab === 'manageAccounts' ? 'active' : ''}
            onClick={() => {
              setActiveTab('manageAccounts');
              setShowUserDialog(true);
            }}
          >
            <FaUsersCog style={{ marginRight: '8px' }} />
            Manage Users
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            <FaCog style={{ marginRight: '8px' }} />
            Settings
          </button>
          <button onClick={() => {
            setActiveTab('logout');
            setShowLogoutDialog(true);
          }}>
            <FaSignOutAlt style={{ marginRight: '8px' }} />
            Logout
          </button>
        </nav>

        <main className="admin-main">
          {activeTab === 'addProduct' && (
            <>
              <div className="top-right-fetch-button">
                <button onClick={handleFetchProducts}>
                  <FaListAlt style={{ marginRight: '6px' }} />
                  Fetch Products
                </button>
              </div>
              <form className="product-form" onSubmit={handleSubmit}>
                <h2>Add Food Product</h2>
                <label>Product Name:</label>
                <input type="text" name="name" onChange={handleInputChange} required />
                <label>Upload Image:</label>
                <input type="file" name="filepath" accept="image/*" onChange={handleInputChange} required />
                <label>Price (Rs):</label>
                <input type="number" name="price" onChange={handleInputChange} required />
                <label>Food Category:</label>
                <select name="categoryId" onChange={handleInputChange} required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <label>Type (Veg/Non-Veg):</label>
                <input type="text" name="type" onChange={handleInputChange} required />
                <label>Restaurant Name:</label>
                <input type="text" name="restaurant" onChange={handleInputChange} required />
                <button type="submit">Add Product</button>
              </form>
            </>
          )}
        </main>
      </div>

      <footer className="admin-footer">
        <div>© 2025 Mitho-Bites. All rights reserved.</div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
        <div>Designed &amp; Implemented by Aadarsha Babu Dhakal</div>
      </footer>
    </div>
  );
};

export default AdminPage;
