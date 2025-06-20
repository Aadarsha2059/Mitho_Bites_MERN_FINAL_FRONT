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
import { FaHome, FaList, FaUtensils, FaClipboardList, FaEllipsisH, FaShoppingBasket, FaArrowLeft } from "react-icons/fa";
import DeleteModal from "../../components/DeleteModal";
import CartDialog from "./cart/CartDialog";
import PaymentMethod from "./PaymentMethod";
import HomeSection from "./dashboard/HomeSection";
import RestaurantsSection from "./dashboard/RestaurantsSection";
import OrdersSection from "./dashboard/OrdersSection";
import MoreOptionsSection from "./dashboard/MoreOptionsSection";
import KhanaKhajan from "./moreoptions/KhanaKhajan";
import GKFood from "./moreoptions/GKFood";
import "./Dashboard.css";

const foodCategories = [
  { id: 'veg', title: "Veg", image: momo, subtitle: "Fresh & healthy vegetarian" },
  { id: 'nonveg', title: "Non-Veg", image: chowmein, subtitle: "Delicious meat dishes" },
  { id: 'others', title: "Others", image: thakali, subtitle: "Snacks, desserts, more" },
];

const allProducts = [
  { id: 1, name: "Veg Momo", image: momo, price: 120, type: "Veg", restaurant: "Momo House", category: "veg" },
  { id: 2, name: "Paneer Chowmein", image: chowmein, price: 140, type: "Veg", restaurant: "Chowmein Express", category: "veg" },
  { id: 3, name: "Chicken Momo", image: momo, price: 160, type: "Non-Veg", restaurant: "Momo House", category: "nonveg" },
  { id: 4, name: "Buff Chowmein", image: chowmein, price: 150, type: "Non-Veg", restaurant: "Chowmein Express", category: "nonveg" },
  { id: 5, name: "Thakali Set", image: thakali, price: 250, type: "Others", restaurant: "Thakali Kitchen", category: "others" },
  { id: 6, name: "Sel Roti", image: thakali, price: 60, type: "Others", restaurant: "Nepali Snacks", category: "others" },
];

const SIDEBAR_OPTIONS = [
  { id: 'dashboard', label: 'Home', icon: <FaHome /> },
  { id: 'categories', label: 'Categories', icon: <FaList /> },
  { id: 'restaurants', label: 'Restaurants', icon: <FaUtensils /> },
  { id: 'orders', label: 'Orders', icon: <FaClipboardList /> },
  { id: 'more', label: 'More', icon: <FaEllipsisH /> },
];

const Dashboard = () => {
  const { addToCart, cart } = useCart();
  const [view, setView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [prevView, setPrevView] = useState('dashboard');
  const [slideDirection, setSlideDirection] = useState('right');
  const mainContentRef = useRef(null);

  // Sidebar navigation handler with animation direction
  const handleSidebarNav = (option) => {
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

  // Add to cart handler (only for category view)
  const handleAddToCart = (product) => {
    addToCart(product);
    setCartModalOpen(true);
  };

  // Filter products for selected category
  const filteredProducts = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : [];

  // Always show a section (never blank)
  let SectionComponent = null;
  if (view === 'dashboard') SectionComponent = <HomeSection />;
  else if (view === 'categories') SectionComponent = (
    <section className="section">
      <h2 className="section-title glow-text">Food Categories</h2>
      <div className="categories-row">
        {foodCategories.map((cat) => (
          <div
            className="category-card animated-card"
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={cat.image} alt={cat.title} className="category-image" />
            <h3 className="category-title">{cat.title}</h3>
            <p className="category-subtitle">{cat.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
  else if (view === 'category') SectionComponent = (
    <div>
      <button className="back-btn big-back-btn" onClick={() => handleBack('categories')}><FaArrowLeft /> Back to Categories</button>
      <ProductList
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        onBack={() => handleBack('categories')}
      />
    </div>
  );
  else if (view === 'restaurants') SectionComponent = <RestaurantsSection />;
  else if (view === 'orders') SectionComponent = <OrdersSection />;
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
  else SectionComponent = <HomeSection />;

  return (
    <div className="dashboard-container fancy-bg">
      <Sidebar options={SIDEBAR_OPTIONS} onNavigate={handleSidebarNav} />
      <div className="sidebar-icon">
        <span className="icon-circle">🍽️</span>
        <span className="icon-label">Mitho Bites</span>
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