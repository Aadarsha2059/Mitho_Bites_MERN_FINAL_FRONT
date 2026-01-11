import React, { useState, useRef, useContext, useEffect } from "react";
import { useCart } from "./CartContext";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ProductList from "./ProductList";
import momo from "../../assets/cat_3.png";
import chowmein from "../../assets/cat_4.png";
import thakali from "../../assets/cat_sri.png";
import res1 from "../../assets/res_1.png";
import res2 from "../../assets/res_2.png";
import res3 from "../../assets/res_3.png";
import loved1 from "../../assets/item_1.png";
import loved2 from "../../assets/item_2.png";
import loved3 from "../../assets/item_3.png";
import { FaHome, FaList, FaUtensils, FaClipboardList, FaEllipsisH, FaShoppingBasket, FaArrowLeft, FaStore, FaShoppingCart } from "react-icons/fa";
import DeleteModal from "../../components/DeleteModal";
import CartDialog from "./cart/CartDialog";
import PaymentMethod from "./PaymentMethod";
import HomeSection from "./dashboard/HomeSection";
import RestaurantsSection from "./dashboard/RestaurantsSection";
import PartyPlacesSection from "./dashboard/PartyPlacesSection";
import RestaurantDetail from "./dashboard/RestaurantDetail";
import OrdersSection from "./dashboard/OrdersSection";
import MoreOptionsSection from "./dashboard/MoreOptionsSection";
import KhanaKhajan from "./moreoptions/KhanaKhajan";
import GKFood from "./moreoptions/GKFood";
import { useFoodCategories } from "../../hooks/useFoodCategories";
import { useFoodProducts } from "../../hooks/useFoodProducts";
import { useRestaurants } from "../../hooks/useRestaurants";
import { getBackendImageUrl } from "../../utils/backend-image";
import "./Dashboard.css";
import "./DashboardEnhanced.css";
import { AuthContext } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const SIDEBAR_OPTIONS = [
  { id: 'dashboard', label: 'Home', icon: <FaHome /> },
  { id: 'categories', label: 'Categories', icon: <FaList /> },
  { id: 'restaurants', label: 'Restaurants', icon: <FaStore /> },
  { id: 'party-places', label: 'Explore Party Place', icon: <FaUtensils /> },
  { id: 'orders', label: 'Orders', icon: <FaClipboardList /> },
  { id: 'more', label: 'More', icon: <FaEllipsisH /> },
];

const Dashboard = () => {
  const { addToCart, cart } = useCart();
  const [view, setView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [prevView, setPrevView] = useState('dashboard');
  const [slideDirection, setSlideDirection] = useState('right');
  const [cartAnimation, setCartAnimation] = useState(false);
  const mainContentRef = useRef(null);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [latestAdditions, setLatestAdditions] = useState(null);
  const [showLatest, setShowLatest] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    async function fetchLatest() {
      try {
        // Use API instance for consistent URL handling
        // ✅ HTTPS CONFIGURATION: Use HTTPS for secure communication
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:5443/api';
        const baseUrl = apiUrl.replace('/api', ''); // Remove /api suffix for dashboard endpoint
        const res = await fetch(`${baseUrl}/api/dashboard/latest-additions`);
        const data = await res.json();
        if (data.success && data.data) {
          setLatestAdditions(data.data);
          setShowLatest(true);
        }
      } catch (e) {
        console.error('Error fetching latest additions:', e);
        // ignore
      }
    }
    fetchLatest();
  }, []);

  // Fetch real data from backend
  const { categories, isLoading: categoriesLoading, error: categoriesError } = useFoodCategories();
  const { products, isLoading: productsLoading, error: productsError } = useFoodProducts();
  const { data: restaurantsData, isLoading: restaurantsLoading, error: restaurantsError } = useRestaurants();
  
  // Extract restaurants from API response
  let restaurants = [];
  if (restaurantsData) {
    if (restaurantsData.success && restaurantsData.data) {
      restaurants = Array.isArray(restaurantsData.data) ? restaurantsData.data : [];
    } else if (Array.isArray(restaurantsData)) {
      restaurants = restaurantsData;
    } else if (restaurantsData.data && Array.isArray(restaurantsData.data)) {
      restaurants = restaurantsData.data;
    }
  }

  // Sidebar navigation handler with animation direction
  const handleSidebarNav = (option) => {
    console.log('Sidebar navigation clicked:', option);
    setSlideDirection(getDirection(view, option));
    setPrevView(view);
    setView(option);
    setSelectedCategory(null);
    // Clear search when switching views to avoid confusion
    setSearchTerm('');
    setSearchActive(false);
  };

  // Determine slide direction based on option order
  function getDirection(current, next) {
    const idx = SIDEBAR_OPTIONS.findIndex(o => o.id === current);
    const nextIdx = SIDEBAR_OPTIONS.findIndex(o => o.id === next);
    return nextIdx > idx ? 'right' : 'left';
  }

  // Animate back (right-to-left) and then set view
  const handleBack = (toView) => {
    setSlideDirection('left');
    setTimeout(() => {
      setView(toView);
      setSlideDirection('right');
    }, 400); // match animation duration
  };

  // Add to cart handler (only for category view)
  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    addToCart(product); // Pass the full product object
    setCartAnimation(true);
    setCartModalOpen(true);
    
    // Reset animation after 1 second
    setTimeout(() => {
      setCartAnimation(false);
    }, 1000);
  };

  // Category click handler
  const handleCategoryClick = (category) => {
    setSlideDirection('right');
    setSelectedCategory(category);
    setView('category');
  };

  // Restaurant click handler
  const handleRestaurantClick = (restaurant) => {
    setSlideDirection('right');
    setSelectedRestaurant(restaurant);
    setView('restaurant-detail');
  };

  // Filter products for selected category and search term
  const filteredProducts = selectedCategory
    ? products.filter((p) => {
        const productCategoryId = p.categoryId?._id || p.categoryId;
        const matchesCategory = productCategoryId?.toString() === selectedCategory._id?.toString();
        const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && (!searchTerm || matchesSearch);
      })
    : searchTerm
      ? products.filter((p) => p.name?.toLowerCase().includes(searchTerm.toLowerCase()))
      : [];


  // Debug logging
  console.log('Categories:', categories);
  console.log('Products:', products);
  console.log('Selected Category:', selectedCategory);
  console.log('Filtered Products:', filteredProducts);

  // Always show a section (never blank)
  let SectionComponent = null;
  console.log('Current view:', view);
  
  if (view === 'dashboard') SectionComponent = (
    <HomeSection 
      onViewAllOrders={() => handleSidebarNav('orders')}
      onCategoryClick={() => handleSidebarNav('categories')}
      onRestaurantClick={() => handleSidebarNav('restaurants')}
      categories={categories}
      restaurants={restaurants}
    />
  );
  else if (view === 'categories') SectionComponent = (
    <section className="section">
      <h2 className="section-title glow-text">Food Categories</h2>
      {categoriesError ? (
        <div style={{
          padding: '20px',
          background: '#ffebee',
          border: '2px solid #f44336',
          borderRadius: '8px',
          color: '#c62828',
          margin: '20px 0'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>❌ Error Loading Categories</h3>
          <p style={{ margin: '0 0 10px 0' }}>
            {categoriesError.message || 'Failed to load categories. Please check your connection.'}
          </p>
          <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>
            💡 Make sure the backend server is running on port 5050
          </p>
        </div>
      ) : categoriesLoading ? (
        <div className="loading-container">
          <div className="loader">Loading categories...</div>
        </div>
      ) : categories.length === 0 ? (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#666'
        }}>
          <p>No categories found. Please add categories from the admin panel.</p>
        </div>
      ) : (
        <div className="categories-row">
          {categories.map((cat) => (
            <div
              className="category-card animated-card"
              key={cat._id}
              onClick={() => handleCategoryClick(cat)}
              style={{ cursor: "pointer" }}
            >
              <img 
                src={cat.image || momo} 
                alt={cat.name} 
                className="category-image" 
                onError={(e) => {
                  console.log('Category image failed to load, using fallback');
                  e.target.src = momo; // Fallback image
                }}
              />
              <h3 className="category-title">{cat.name}</h3>
              <p className="category-subtitle">
                {products.filter(p => {
                  const productCategoryId = p.categoryId?._id || p.categoryId;
                  return productCategoryId?.toString() === cat._id?.toString();
                }).length} items available
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
  else if (view === 'category') SectionComponent = (
    <div>
      <button className="back-btn big-back-btn" onClick={() => handleBack('categories')}><FaArrowLeft /> Back to Categories</button>
      
      {/* Category Header with Name and Image */}
      {selectedCategory && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <img 
            src={selectedCategory.image || momo} 
            alt={selectedCategory.name}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #fff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
            onError={(e) => {
              e.target.src = momo;
            }}
          />
          <div>
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              {selectedCategory.name}
            </h2>
            <p style={{
              margin: '0',
              fontSize: '16px',
              color: '#e0e0e0',
              opacity: '0.9'
            }}>
              {filteredProducts.length} items available
            </p>
          </div>
        </div>
      )}
      
      {productsLoading ? (
        <div className="loading-container">
          <div className="loader">Loading products...</div>
        </div>
      ) : (
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onBack={() => handleBack('categories')}
        />
      )}
    </div>
  );
  else if (view === 'party-places') SectionComponent = <PartyPlacesSection />;
  else if (view === 'restaurants') {
    console.log('Rendering RestaurantsSection');
    SectionComponent = (
      <RestaurantsSection 
        onRestaurantClick={handleRestaurantClick}
        error={restaurantsError}
      />
    );
  }
  else if (view === 'orders') {
    console.log('Rendering OrdersSection');
    SectionComponent = <OrdersSection />;
  }
  else if (view === 'more') SectionComponent = <MoreOptionsSection onBack={() => handleBack('dashboard')} />;
  else if (view === 'khana') SectionComponent = (
    <div>
      <button className="back-btn big-back-btn" onClick={() => handleBack('more')}><FaArrowLeft /> Back to More</button>
      <KhanaKhajan />
    </div>
  );
  else if (view === 'gk') SectionComponent = (
    <div>
      <button className="back-btn big-back-btn" onClick={() => handleBack('more')}><FaArrowLeft /> Back to More</button>
      <GKFood />
    </div>
  );
  else if (view === 'restaurant-detail') SectionComponent = (
    <RestaurantDetail 
      restaurant={selectedRestaurant}
      onBack={() => handleBack('restaurants')}
      onAddToCart={handleAddToCart}
    />
  );
  else SectionComponent = <HomeSection />;

  console.log('Rendering component for view:', view, 'Component:', SectionComponent?.type?.name || 'Unknown');

  const handleLogout = () => {
    logout();
    // Navigation to homepage is now handled by the Sidebar component
  };

  // Professional search box above main content
  return (
    <div className="dashboard-container fancy-bg">
      {/* Latest Additions Notification */}
      {latestAdditions && showLatest && (
        <div className="dashboard-notification" style={{
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(12px)',
          border: '2.5px solid #ffe0b2',
          boxShadow: '0 8px 32px #ff6b3522, 0 2px 12px #0001',
          color: '#b71c1c',
          fontWeight: 700,
          fontSize: '1.08rem',
          borderRadius: '1.7rem',
          padding: '14px 28px',
          margin: '18px auto',
          maxWidth: 440,
          minWidth: 260,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          position: 'relative',
          zIndex: 1000,
          overflow: 'hidden',
        }}>
          <span style={{fontSize:'1.7rem',marginRight:10,filter:'drop-shadow(0 2px 8px #ffe082)'}} role="img" aria-label="new">🎉</span>
          <span style={{fontWeight:900,letterSpacing:'0.5px',color:'#ff6f00',fontSize:'1.13rem',marginRight:6}}>New on BhokBhoj!</span>
          <span style={{color:'#b71c1c',fontWeight:700}}>
            {latestAdditions.restaurant && (<span>🍽️ <b>{latestAdditions.restaurant}</b>&nbsp;|&nbsp;</span>)}
            {latestAdditions.category && (<span>📂 <b>{latestAdditions.category}</b>&nbsp;|&nbsp;</span>)}
            {latestAdditions.food && (<span>🍲 <b>{latestAdditions.food}</b></span>)}
          </span>
          <button onClick={()=>setShowLatest(false)} style={{marginLeft:'auto',background:'rgba(255,255,255,0.7)',border:'none',fontSize:'1.5rem',color:'#ff6f00',cursor:'pointer',borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px #ffe08255',transition:'background 0.2s'}} aria-label="Close notification">×</button>
          {/* Confetti effect */}
          <span style={{position:'absolute',top:0,left:0,fontSize:'1.5rem',opacity:0.7,transform:'rotate(-15deg)'}}>✨</span>
          <span style={{position:'absolute',top:0,right:0,fontSize:'1.5rem',opacity:0.7,transform:'rotate(15deg)'}}>✨</span>
          <span style={{position:'absolute',bottom:0,left:0,fontSize:'1.5rem',opacity:0.7,transform:'rotate(10deg)'}}>✨</span>
          <span style={{position:'absolute',bottom:0,right:0,fontSize:'1.5rem',opacity:0.7,transform:'rotate(-10deg)'}}>✨</span>
        </div>
      )}
      {/* Sidebar is only for user dashboard, not admin pages */}
      {window.location.pathname === '/dashboard' && (
        <>
          <Sidebar options={SIDEBAR_OPTIONS} onNavigate={handleSidebarNav} onLogout={handleLogout} />
          <div className="sidebar-icon">
            <span className="icon-circle">🍽️</span>
            <span className="icon-label">BhokBhoj</span>
          </div>
        </>
      )}
      
      {/* Floating Cart Icon */}
      <div className={`floating-cart-icon ${cartAnimation ? 'cart-added' : ''}`} onClick={() => setCartModalOpen(true)}>
        <FaShoppingCart className="floating-cart-icon-img" />
        {cart.length > 0 && (
          <span className="floating-cart-badge">
            {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          </span>
        )}
        <div className="floating-cart-tooltip">View Cart</div>
      </div>
      
      <main className="main-content">
        {/* Professional Dashboard Header with Greeting - Single Instance */}
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
        }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: '0 0 12px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            letterSpacing: '-0.5px'
          }}>
            <span style={{ fontSize: '2rem' }}>👋</span>
            <span>Hello, {user?.fullname || user?.username || 'Foodie'}!</span>
            <span style={{ fontSize: '2rem' }}>🍽️</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: '0',
            fontWeight: '400',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span>Let's enjoy your food journey together</span>
            <span>✨</span>
          </p>
        </div>

        {/* Professional Search Box */}
        <div style={{ 
          width: '100%', 
          maxWidth: 700, 
          margin: '0 auto 40px auto', 
          display: 'flex', 
          alignItems: 'center', 
          background: '#ffffff', 
          borderRadius: '12px', 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', 
          padding: '16px 24px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
          e.currentTarget.style.borderColor = 'rgba(255, 111, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
        }}
        >
          <span style={{ color: '#ff6f00', fontSize: 20, marginRight: 12 }} role="img" aria-label="search">🔍</span>
          <input
            type="text"
            placeholder="Search for food products, categories, restaurants..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setTimeout(() => setSearchActive(false), 200)}
            style={{ 
              flex: 1, 
              border: 'none', 
              outline: 'none', 
              fontSize: 16, 
              background: 'transparent', 
              color: '#1a1a1a', 
              fontWeight: 400 
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: 18,
                color: '#999',
                cursor: 'pointer',
                padding: '0 8px',
                marginLeft: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: '50%',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
                e.currentTarget.style.color = '#666';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#999';
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="dashboard-header-wrapper">
          <Header />
          <div className="cart-icon" onClick={() => setCartModalOpen(true)}>
            <FaShoppingBasket className="cart-icon-img" />
            {cart.length > 0 && <span className="cart-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}
          </div>
        </div>
        <div
          className={`dashboard-scroll-area slide-${slideDirection}`}
          key={view}
          ref={mainContentRef}
        >
          {SectionComponent}
        </div>
        {/* Cart Modal */}
        <DeleteModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} title="Your Cart" wide>
          <CartDialog onClose={() => setCartModalOpen(false)} onProceedPayment={() => { setCartModalOpen(false); setPaymentModalOpen(true); }} />
        </DeleteModal>
        {/* Payment Modal */}
        <DeleteModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} title="Payment" wide>
          <PaymentMethod onClose={() => setPaymentModalOpen(false)} />
        </DeleteModal>
      </main>
    </div>
  );
};

export default Dashboard;

