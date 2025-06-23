import React, { useState, useRef } from "react";
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
import ProfilePage from "./moreoptions/ProfilePage";
import { useFoodCategories } from "../../hooks/useFoodCategories";
import { useFoodProducts } from "../../hooks/useFoodProducts";
import { getBackendImageUrl } from "../../utils/backend-image";
import "./Dashboard.css";

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

  // Fetch real data from backend
  const { categories, isLoading: categoriesLoading } = useFoodCategories();
  const { products, isLoading: productsLoading } = useFoodProducts();

  // Sidebar navigation handler with animation direction
  const handleSidebarNav = (option) => {
    console.log('Sidebar navigation clicked:', option);
    setSlideDirection(getDirection(view, option));
    setPrevView(view);
    setView(option);
    setSelectedCategory(null);
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

  // Category click handler
  const handleCategoryClick = (catId) => {
    setSlideDirection('right');
    setSelectedCategory(catId);
    setView('category');
  };

  // Restaurant click handler
  const handleRestaurantClick = (restaurant) => {
    setSlideDirection('right');
    setSelectedRestaurant(restaurant);
    setView('restaurant-detail');
  };

  // Add to cart handler (only for category view)
  const handleAddToCart = (product) => {
    addToCart(product);
    setCartAnimation(true);
    setCartModalOpen(true);
    
    // Reset animation after 1 second
    setTimeout(() => {
      setCartAnimation(false);
    }, 1000);
  };

  // Filter products for selected category
  const filteredProducts = selectedCategory
    ? products.filter((p) => {
        // Convert both to strings for comparison
        const productCategoryId = p.categoryId?._id || p.categoryId;
        return productCategoryId?.toString() === selectedCategory?.toString();
      })
    : [];

  // Debug logging
  console.log('Categories:', categories);
  console.log('Products:', products);
  console.log('Selected Category:', selectedCategory);
  console.log('Filtered Products:', filteredProducts);

  // Always show a section (never blank)
  let SectionComponent = null;
  console.log('Current view:', view);
  
  if (view === 'dashboard') SectionComponent = <HomeSection />;
  else if (view === 'categories') SectionComponent = (
    <section className="section">
      <h2 className="section-title glow-text">Food Categories</h2>
      {categoriesLoading ? (
        <div className="loading-container">
          <div className="loader">Loading categories...</div>
        </div>
      ) : (
        <div className="categories-row">
          {categories.map((cat) => (
            <div
              className="category-card animated-card"
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              style={{ cursor: "pointer" }}
            >
              <img 
                src={cat.filepath ? getBackendImageUrl(cat.filepath) : momo} 
                alt={cat.name} 
                className="category-image" 
                onError={(e) => {
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
  else if (view === 'restaurants') SectionComponent = (
    <RestaurantsSection onRestaurantClick={handleRestaurantClick} />
  );
  else if (view === 'orders') SectionComponent = <OrdersSection />;
  else if (view === 'more') SectionComponent = <MoreOptionsSection onProfile={() => setView('profile')} onBack={() => handleBack('dashboard')} />;
  else if (view === 'profile') SectionComponent = <ProfilePage />;
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

  return (
    <div className="dashboard-container fancy-bg">
      <Sidebar options={SIDEBAR_OPTIONS} onNavigate={handleSidebarNav} />
      <div className="sidebar-icon">
        <span className="icon-circle">🍽️</span>
        <span className="icon-label">Mitho Bites</span>
      </div>
      
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