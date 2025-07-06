import React, { useState, useEffect, useRef } from 'react';
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
  FaSearch,
  FaHistory,
} from 'react-icons/fa';
import { useAdminCategory } from '../../hooks/admin/useAdminCategory';
import { useCreateProduct } from '../../hooks/admin/useAdminProduct';
import { useAdminRestaurant } from '../../hooks/admin/useAdminRestaurant';
import { toast } from 'react-toastify';
import adminFood from '../../assets/admin/adminfood.png';
import momo from '../../assets/images/momo.png';
import selRoti from '../../assets/images/sel_roti.png';
import yomari from '../../assets/images/yomari.png';
import featured1 from '../../assets/images/featured/featured1.png';
import adminAvatar from '../../assets/admin/adminfood.png'; // Use as avatar for now

const AdminPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('addProduct');
  const [showRestaurantDialog, setShowRestaurantDialog] = useState(false);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch categories and restaurants from backend
  const { categories, isLoading: categoriesLoading } = useAdminCategory();
  const { restaurants, isLoading: restaurantsLoading } = useAdminRestaurant();
  
  // Create product mutation
  const createProductMutation = useCreateProduct();

  const [formData, setFormData] = useState({
    name: '',
    filepath: null,
    price: '',
    categoryId: '',
    type: '',
    restaurantId: '',
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!formData.name || !formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    
    if (!formData.categoryId) {
      toast.error('Please select a category');
      return;
    }
    
    if (!formData.type || !formData.type.trim()) {
      toast.error('Please enter the food type (Indian/Nepali)');
      return;
    }
    
    if (!formData.restaurantId) {
      toast.error('Please select a restaurant');
      return;
    }
    
    if (!formData.filepath) {
      toast.error('Please select an image');
      return;
    }

    const productData = new FormData();
    productData.append('name', formData.name.trim());
    productData.append('image', formData.filepath);
    productData.append('price', formData.price);
    productData.append('categoryId', formData.categoryId);
    productData.append('type', formData.type.trim());
    productData.append('restaurantId', formData.restaurantId);

    try {
      console.log('Submitting product data:', {
        name: formData.name.trim(),
        price: formData.price,
        categoryId: formData.categoryId,
        type: formData.type.trim(),
        restaurantId: formData.restaurantId,
        file: formData.filepath
      });
      
      await createProductMutation.mutateAsync(productData);
      toast.success('Food product added successfully!');
      
      // Reset form and file input
      setFormData({
        name: '',
        filepath: null,
        price: '',
        categoryId: '',
        type: '',
        restaurantId: '',
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Product creation error:', error);
      toast.error(error.message || 'Failed to add product');
    }
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

  const handleAddRestaurant = () => {
    setShowRestaurantDialog(false);
    navigate('/admin/restaurant/create');
  };

  const handleGetRestaurants = () => {
    setShowRestaurantDialog(false);
    navigate('/admin/restaurant');
  };

  const handleRestaurantManagement = () => {
    setShowRestaurantDialog(false);
    navigate('/admin/restaurants');
  };

  const handleSettingsNavigate = () => {
    setActiveTab('settings');
    navigate('/admin/adminsettings');
  };

  // Map each tab to a background image
  const tabBackgrounds = {
    addProduct: adminFood,
    addRestaurant: momo,
    categories: selRoti,
    manageAccounts: yomari,
    settings: featured1,
    logout: adminFood,
  };
  const bgImage = tabBackgrounds[activeTab] || adminFood;

  // Make search box functional: call handleFetchProducts with searchTerm
  const handleSearch = (e) => {
    e.preventDefault();
    handleFetchProducts(searchTerm);
  };

  return (
    <div className="admin-container" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.55), rgba(255,245,240,0.55)), url(${bgImage})` }}>
      <div className="admin-bg-overlay" />
      {showRestaurantDialog && (
        <div className="admin-dialog">
          <div className="admin-dialog-content">
            <button className="admin-dialog-close" onClick={() => setShowRestaurantDialog(false)}>×</button>
            <h3>Restaurant Management</h3>
            <button className="dialog-button" onClick={handleAddRestaurant}>Add Restaurants</button>
            <button className="dialog-button" onClick={handleGetRestaurants}>Get Restaurants</button>
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
          <div className="admin-profile-card">
            <img src={adminAvatar} alt="Admin Avatar" className="admin-profile-avatar" />
            <div className="admin-profile-info">
              <span className="admin-profile-name">Aadarsha Babu</span>
              <span className="admin-profile-role">Administrator</span>
            </div>
          </div>
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
            Restaurant Management
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
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={handleSettingsNavigate}
          >
            <FaCog style={{ marginRight: '8px' }} />
            Settings
          </button>
          <button
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => {
              setActiveTab('history');
              navigate('/admin/transaction-history');
            }}
          >
            <FaHistory style={{ marginRight: '8px' }} />
            Transaction History
          </button>
          <button
            className={activeTab === 'logout' ? 'active' : ''}
            onClick={() => setShowLogoutDialog(true)}
          >
            <FaSignOutAlt style={{ marginRight: '8px' }} />
            Logout
          </button>
        </nav>

        <main className="admin-main">
          <div className="admin-content">
            <div className="admin-search-section">
              <form onSubmit={handleSearch} className="admin-search-form">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-search-input"
                />
                <button type="submit" className="admin-search-btn">
                  <FaSearch />
                </button>
              </form>
              <button onClick={handleFetchProducts} className="admin-fetch-btn">
                <FaListAlt style={{ marginRight: '8px' }} />
                Fetch Products
              </button>
            </div>

            <div className="admin-form-section">
              <h2>Add New Food Product</h2>
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price (NPR) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    disabled={categoriesLoading}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {categoriesLoading && <small>Loading categories...</small>}
                </div>

                <div className="form-group">
                  <label>Restaurant *</label>
                  <select
                    name="restaurantId"
                    value={formData.restaurantId}
                    onChange={handleInputChange}
                    required
                    disabled={restaurantsLoading}
                  >
                    <option value="">Select a restaurant</option>
                    {restaurants.map((restaurant) => (
                      <option key={restaurant._id} value={restaurant._id}>
                        {restaurant.name} - {restaurant.location}
                      </option>
                    ))}
                  </select>
                  {restaurantsLoading && <small>Loading restaurants...</small>}
                </div>

                <div className="form-group">
                  <label>Food Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select food type</option>
                    <option value="Indian">Indian</option>
                    <option value="Nepali">Nepali</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Product Image *</label>
                  <input
                    type="file"
                    name="filepath"
                    onChange={handleInputChange}
                    accept="image/*"
                    ref={fileInputRef}
                    required
                  />
                </div>

                <button type="submit" disabled={createProductMutation.isLoading} className="admin-submit-btn">
                  {createProductMutation.isLoading ? 'Adding Product...' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      <footer className="admin-footer">
        <div className="admin-footer-content">
          <div className="admin-footer-section">
            <h4>Connect with us</h4>
            <div className="admin-social-links">
              <a href="#" className="admin-social-link">
                <FaFacebook />
              </a>
              <a href="#" className="admin-social-link">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="admin-footer-section">
            <p>&copy; 2024 Mitho-Bites. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
