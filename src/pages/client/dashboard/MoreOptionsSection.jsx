import React, { useState } from "react";
import { FaCog, FaBookOpen, FaUserCircle, FaSignOutAlt, FaTimes, FaMedal, FaLock, FaGift, FaBoxOpen, FaStar, FaLeaf, FaAppleAlt, FaDrumstickBite, FaThList, FaLightbulb, FaChartLine, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";
import ReactDOM from 'react-dom';
import MyPurchaseTrend from '../moreoptions/MyPurchaseTrend';
import SettingsDialog from '../moreoptions/SettingsDialog';
import ProfileDialog from '../moreoptions/ProfileDialog';
import MithoBitesDialog from '../moreoptions/MithoBitesDialog';

const options = [
  { id: 'settings', label: 'Settings', icon: <FaCog />, action: 'settings' },
  { id: 'khana', label: 'Khana Khajan', icon: <FaBookOpen />, action: 'khana' },
  { id: 'trend', label: 'My Purchase Trend', icon: <FaChartLine />, action: 'purchaseTrend' },
  { id: 'mithoPoints', label: 'Mitho Points', icon: <FaMedal />, action: 'mithoPoints' },
  { id: 'profile', label: 'Profile', icon: <FaUserCircle />, action: 'profile' },
  { id: 'mithoBites', label: 'BhokBhoj', icon: <FaUtensils />, action: 'mithoBites' },
];

const LUCKY_TOKEN_THRESHOLD = 20;

const khanaCategories = [
  {
    name: 'Vegetarian Delights',
    icon: <FaLeaf />,
    color: '#43a047',
    gradient: ['#66bb6a', '#388e3c'],
    description: 'Fresh, healthy, and delicious plant-based foods',
    items: [
      'Dal Bhat (Rice & Lentils)',
      'Saag Paneer (Spinach & Cheese)',
      'Aloo Gobi (Potato & Cauliflower)',
      'Baingan Bharta (Roasted Eggplant)',
      'Chana Masala (Chickpea Curry)',
      'Palak Paneer (Spinach & Cottage Cheese)',
      'Mixed Vegetable Curry',
      'Mushroom Masala',
      'Tofu Stir Fry',
      'Quinoa Bowl',
    ],
    image: null,
  },
  {
    name: 'Fresh Fruits',
    icon: <FaAppleAlt />,
    color: '#fb8c00',
    gradient: ['#ffa726', '#e65100'],
    description: 'Nature\'s sweet and nutritious gifts',
    items: [
      'Mango (Aam)',
      'Banana (Kera)',
      'Apple (Syau)',
      'Orange (Suntala)',
      'Pomegranate (Anar)',
      'Grapes (Angur)',
      'Pineapple (Bhainse)',
      'Papaya (Mewa)',
      'Guava (Amba)',
      'Strawberry (Strawberry)',
    ],
    image: null,
  },
  {
    name: 'Non-Vegetarian',
    icon: <FaDrumstickBite />,
    color: '#e53935',
    gradient: ['#ef5350', '#b71c1c'],
    description: 'Rich and flavorful meat-based dishes',
    items: [
      'Chicken Curry (Kukhura ko Masu)',
      'Mutton Curry (Khasi ko Masu)',
      'Fish Curry (Machha ko Masu)',
      'Chicken Biryani',
      'Lamb Rogan Josh',
      'Tandoori Chicken',
      'Butter Chicken',
      'Fish Tikka',
      'Chicken Tikka Masala',
      'Mutton Seekh Kebab',
    ],
    image: null,
  },
  {
    name: 'Miscellaneous',
    icon: <FaThList />,
    color: '#8e24aa',
    gradient: ['#ab47bc', '#4527a0'],
    description: 'Unique and diverse culinary creations',
    items: [
      'Momos (Dumplings)',
      'Chow Mein',
      'Fried Rice',
      'Noodles',
      'Pizza',
      'Burger',
      'Sandwich',
      'Pasta',
      'Sushi',
      'Tacos',
    ],
    image: null,
  },
];

const khanaFacts = [
  '🍎 Apples float in water because 25% of their volume is air!',
  '🥕 Carrots were originally purple, not orange!',
  '🍌 Bananas are berries, but strawberries aren\'t!',
  '🥚 The color of an egg yolk indicates the hen\'s diet!',
  '🍯 Honey never spoils - archaeologists found 3,000-year-old honey that was still edible!',
  '🌶️ Hot peppers get their heat from a chemical called capsaicin!',
  '🥜 Peanuts are not nuts - they\'re legumes!',
  '🍫 Chocolate was once used as currency by the Aztecs!',
  '🥛 Milk is naturally white because it reflects all light wavelengths!',
  '🍕 The first pizza was created in Naples, Italy in 1889!',
  '🥑 Avocados are fruits, and they\'re technically berries!',
  '🍍 Pineapples take 2-3 years to grow from seed to fruit!',
  '🥬 Lettuce is 96% water!',
  '🍇 Grapes explode when you put them in the microwave!',
  '🥜 Cashews grow on the outside of a fruit called a cashew apple!',
  '🍯 Bees must visit 2 million flowers to make 1 pound of honey!',
  '🥕 The world\'s largest carrot was over 19 feet long!',
  '🍎 There are over 7,500 varieties of apples worldwide!',
  '🥜 Almonds are seeds, not nuts!',
  '🍫 White chocolate isn\'t actually chocolate - it contains no cocoa solids!',
];

const MoreOptionsSection = () => {
  const navigate = useNavigate();
  const [showMithoDialog, setShowMithoDialog] = useState(false);
  const [itemsReceived, setItemsReceived] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showKhanaDialog, setShowKhanaDialog] = useState(false);
  const [selectedKhanaCategory, setSelectedKhanaCategory] = useState(0);
  const [showFacts, setShowFacts] = useState(false);
  const [showPurchaseTrend, setShowPurchaseTrend] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showMithoBitesDialog, setShowMithoBitesDialog] = useState(false);

  const fetchMithoPoints = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';
      const response = await fetch(`${apiUrl}/api/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        const receivedOrders = data.data.filter(order => order.orderStatus === 'received');
        let totalItems = 0;
        receivedOrders.forEach(order => {
          if (Array.isArray(order.items)) {
            totalItems += order.items.length;
          }
        });
        setItemsReceived(totalItems);
      } else {
        setItemsReceived(0);
      }
    } catch (e) {
      setItemsReceived(0);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (opt) => {
    if (opt.action === 'mithoPoints') {
      fetchMithoPoints();
      setShowMithoDialog(true);
    } else if (opt.action === 'khana') {
      setShowKhanaDialog(true);
    } else if (opt.action === 'purchaseTrend') {
      setShowPreview(false);
      setShowPurchaseTrend(true);
    } else if (opt.action === 'settings') {
      setShowSettingsDialog(true);
    } else if (opt.action === 'profile') {
      setShowProfileDialog(true);
    } else if (opt.action === 'mithoBites') {
      setShowMithoBitesDialog(true);
    } else if (opt.route) {
      navigate(opt.route);
    }
  };

  // Mitho Points Dialog UI (centered format)
  const MithoPointsDialog = () => {
    const unlocked = itemsReceived >= LUCKY_TOKEN_THRESHOLD;
    const items = itemsReceived;
    // Generate lucky coupon code when unlocked
    const luckyCouponCode = unlocked ? `LUCKY${Date.now().toString().slice(-6)}` : null;
    
    return (
      ReactDOM.createPortal(
        <div className="mitho-dialog-overlay" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.25)',zIndex:3000}}>
          <div className="mitho-dialog" style={{
            background:'linear-gradient(135deg, #f8f9fa 0%, #ffe3d1 100%)',
            borderRadius:'2.5rem',
            boxShadow:'0 16px 64px rgba(255,107,53,0.2), 0 2px 12px rgba(0,0,0,0.1)',
            padding:'48px 56px',
            minWidth:'540px',
            maxWidth:'850px',
            width:'92vw',
            position:'fixed',
            top:'56px',
            right:'50%',
            left:'50%',
            transform:'translate(-50%, 0)',
            zIndex:3100,
            overflow:'auto',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            maxHeight:'82vh',
            border:'2.5px solid #ffe3d1',
          }}>
            <button onClick={()=>setShowMithoDialog(false)} style={{position:'absolute',top:18,right:24,background:'#fff',border:'2px solid #e53935',fontSize:'2rem',color:'#e53935',cursor:'pointer',width:'45px',height:'45px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',transition:'all 0.2s ease',zIndex:3200,boxShadow:'0 2px 8px rgba(229,57,53,0.3)'}}
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
            ><FaTimes/></button>
            <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'18px',justifyContent:'center'}}>
              <FaStar style={{fontSize:'2.2rem',color:'#FFD700',filter:'drop-shadow(0 2px 8px #FFD70088)'}}/>
              <h2 style={{margin:0,fontWeight:800,fontSize:'2rem',color:'#FF6B35',letterSpacing:'1.2px'}}>Mitho Points</h2>
            </div>
            {loading ? (
              <div style={{textAlign:'center',padding:'24px 0'}}>Loading...</div>
            ) : (
              <>
                <div style={{width:'100%',background:'#fff',borderRadius:'1.7rem',boxShadow:'0 2px 12px rgba(0,0,0,0.1)',padding:'28px 32px',marginBottom:'20px'}}>
                  <div style={{fontSize:'1.5rem',fontWeight:700,color:'#388E3C',marginBottom:'15px',textAlign:'center'}}>
                    Items Received: <span style={{color:'#FF6B35',fontSize:'2.2rem'}}>{items}</span>
                  </div>
                  <div style={{margin:'18px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                    {unlocked ? (
                      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',width:'100%'}}>
                        <div style={{position:'relative',width:'90px',height:'90px',marginBottom:'8px'}}>
                          <div style={{position:'absolute',width:'90px',height:'90px',borderRadius:'50%',background:'conic-gradient(orange, yellow, pink, green, blue, orange)',filter:'blur(2px)',zIndex:0}}></div>
                          <FaGift style={{fontSize:'70px',color:'#ffb300',position:'absolute',top:'10px',left:'10px',zIndex:1,filter:'drop-shadow(0 2px 8px #ffb30088)'}}/>
                          <FaMedal style={{fontSize:'54px',color:'#FFD700',position:'absolute',top:'18px',left:'18px',zIndex:2,filter:'drop-shadow(0 2px 8px #FFD70088)'}}/>
                        </div>
                        <div style={{fontSize:'18px',fontWeight:'bold',color:'#388E3C',textAlign:'center'}}>
                          Congratulations! You have received a <span style={{color:'#FF6B35'}}>Lucky Token Coin</span> for your loyalty! 🎉
                        </div>
                        <div style={{width:'100%',background:'linear-gradient(135deg, #fff8e1 0%, #ffe3d1 100%)',borderRadius:'1.2rem',padding:'20px',marginTop:'16px',border:'2px solid #FF6B35'}}>
                          <div style={{fontSize:'1rem',fontWeight:700,color:'#666',marginBottom:'12px',textAlign:'center'}}>Your Lucky Coupon Code:</div>
                          <div style={{
                            background:'#fff',
                            borderRadius:'12px',
                            padding:'16px 24px',
                            fontSize:'1.8rem',
                            fontWeight:800,
                            color:'#FF6B35',
                            textAlign:'center',
                            letterSpacing:'2px',
                            border:'2px dashed #FF6B35',
                            fontFamily:'monospace',
                            boxShadow:'0 4px 12px rgba(255,107,53,0.2)'
                          }}>
                            {luckyCouponCode}
                          </div>
                          <div style={{fontSize:'0.9rem',color:'#666',marginTop:'12px',textAlign:'center',fontWeight:500}}>
                            Use this code at checkout to redeem your gift hamper!
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                        <div style={{position:'relative',width:'70px',height:'70px',marginBottom:'8px'}}>
                          <FaLock style={{fontSize:'70px',color:'#e0e0e0',position:'absolute',top:0,left:0}}/>
                          <FaMedal style={{fontSize:'54px',color:'#FFD700',position:'absolute',top:'8px',left:'8px',filter:'drop-shadow(0 2px 8px #FFD70088)'}}/>
                        </div>
                        <div style={{fontSize:'16px',color:'#888',fontWeight:600}}>Lucky Token Coin (Locked)</div>
                        <div style={{fontSize:'17px',color:'#333',fontWeight:500,textAlign:'center',marginTop:'6px'}}>
                          You are <span style={{color:'#FF6B35',fontWeight:700}}>{LUCKY_TOKEN_THRESHOLD - items}</span> item{LUCKY_TOKEN_THRESHOLD - items === 1 ? '' : 's'} away from a Lucky Token Coin!
                        </div>
                        <div style={{fontSize:'0.95rem',color:'#666',marginTop:'8px',textAlign:'center',fontStyle:'italic'}}>
                          Receive {LUCKY_TOKEN_THRESHOLD} items to unlock your lucky coupon!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )
    );
  };

  const KhanaKhajanDialog = () => (
    ReactDOM.createPortal(
      <div className="mitho-dialog-overlay" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.25)',zIndex:3000}}>
        <div className="mitho-dialog" style={{
          background:'linear-gradient(135deg, #f8f9fa 0%, #ffe3d1 100%)',
          borderRadius:'2.5rem',
          boxShadow:'0 16px 64px #ff6b3533, 0 2px 12px #0001',
          padding:'48px 56px',
          minWidth:'540px',
          maxWidth:'950px',
          width:'92vw',
          position:'fixed',
          top:'56px',
          right:'50%',
          left:'50%',
          transform:'translate(-50%, 0)',
          zIndex:3100,
          overflow:'auto',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          maxHeight:'82vh',
          border:'2.5px solid #ffe3d1',
        }}>
          <button onClick={()=>setShowKhanaDialog(false)} style={{position:'absolute',top:22,right:38,background:'none',border:'none',fontSize:'2.3rem',color:'#e53935',cursor:'pointer',zIndex:3200}}><FaTimes/></button>
          <div style={{display:'flex',alignItems:'center',gap:'18px',marginBottom:'28px',justifyContent:'center'}}>
            <FaBookOpen style={{fontSize:'2.7rem',color:'#FF6B35'}}/>
            <h2 style={{margin:0,fontWeight:800,fontSize:'2.3rem',color:'#FF6B35',letterSpacing:'1.2px'}}>Khana Khajana</h2>
          </div>
          {/* Category Dropdown */}
          <div style={{width:'100%',display:'flex',justifyContent:'center',marginBottom:'28px'}}>
            <select
              value={selectedKhanaCategory}
              onChange={e => setSelectedKhanaCategory(Number(e.target.value))}
              style={{
                padding:'14px 22px',
                borderRadius:'20px',
                fontWeight:800,
                fontSize:'1.13rem',
                border:`2.5px solid ${khanaCategories[selectedKhanaCategory].color}`,
                color: khanaCategories[selectedKhanaCategory].color,
                background:'#fff',
                boxShadow:`0 4px 16px ${khanaCategories[selectedKhanaCategory].color}11`,
                outline:'none',
                minWidth:'220px',
                cursor:'pointer',
                transition:'all 0.2s',
              }}
            >
              {khanaCategories.map((cat, idx) => (
                <option key={cat.name} value={idx} style={{color:cat.color}}>{cat.name}</option>
              ))}
            </select>
          </div>
          {/* Category Content */}
          <div style={{width:'100%',background:'#fff',borderRadius:'1.7rem',boxShadow:'0 2px 12px #0001',marginBottom:'28px',padding:'28px 22px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'20px',marginBottom:'14px'}}>
              <div style={{padding:'14px',background:'#f3f3f3',borderRadius:'17px'}}>{khanaCategories[selectedKhanaCategory].icon}</div>
              <div>
                <div style={{fontSize:'1.5rem',fontWeight:800,color:khanaCategories[selectedKhanaCategory].color}}>{khanaCategories[selectedKhanaCategory].name}</div>
                <div style={{fontSize:'1.09rem',color:'#888',fontWeight:600}}>{khanaCategories[selectedKhanaCategory].description}</div>
              </div>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'14px',marginTop:'12px'}}>
              {khanaCategories[selectedKhanaCategory].items.map((item, idx) => (
                <div key={item} style={{
                  background:khanaCategories[selectedKhanaCategory].color+'11',
                  color:khanaCategories[selectedKhanaCategory].color,
                  borderRadius:'12px',
                  padding:'12px 18px',
                  fontWeight:700,
                  fontSize:'1.07rem',
                  border:`1.5px solid ${khanaCategories[selectedKhanaCategory].color}33`,
                  minWidth:'130px',
                  textAlign:'center',
                }}>{item}</div>
              ))}
            </div>
          </div>
          {/* Did You Know Section */}
          <div style={{width:'100%',background:'linear-gradient(135deg,#fffbe7,#ffe3d1)',borderRadius:'1.7rem',boxShadow:'0 2px 12px #ff6b3511',padding:'28px 22px',marginBottom:'14px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'12px'}}>
              <FaLightbulb style={{fontSize:'1.7rem',color:'#FFB300'}}/>
              <div style={{fontSize:'1.25rem',fontWeight:800,color:'#FF6B35'}}>Did You Know?</div>
              <button onClick={()=>setShowFacts(f=>!f)} style={{marginLeft:'auto',background:'none',border:'none',fontSize:'1.7rem',color:'#FF6B35',cursor:'pointer'}}>{showFacts ? <FaTimes/> : <FaBoxOpen/>}</button>
            </div>
            {showFacts && (
              <div style={{maxHeight:'260px',overflowY:'auto',marginTop:'12px'}}>
                {khanaFacts.map((fact, idx) => (
                  <div key={idx} style={{background:'#fff',borderRadius:'12px',padding:'12px 16px',marginBottom:'10px',boxShadow:'0 1px 4px #0001',color:'#FF6B35',fontWeight:600,fontSize:'1.05rem',display:'flex',alignItems:'center',gap:'10px'}}>
                    <span style={{fontSize:'1.15rem'}}>💡</span> {fact}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    )
  );

  const PurchaseTrendDialog = () => (
    ReactDOM.createPortal(
      <MyPurchaseTrend 
        onClose={() => {
          setShowPurchaseTrend(false);
          setShowPreview(false);
        }} 
      />, document.body
    )
  );

  const SettingsDialogComponent = () => (
    ReactDOM.createPortal(
      <SettingsDialog onClose={() => setShowSettingsDialog(false)} />, document.body
    )
  );

  const ProfileDialogComponent = () => (
    ReactDOM.createPortal(
      <ProfileDialog onClose={() => setShowProfileDialog(false)} />, document.body
    )
  );

  const MithoBitesDialogComponent = () => (
    ReactDOM.createPortal(
      <MithoBitesDialog onClose={() => setShowMithoBitesDialog(false)} />, document.body
    )
  );

  return (
    <section className="section">
      <h2 className="section-title glow-text">More Options</h2>
      <div className="more-options-list">
        {options.map(opt => (
          <div
            className="more-option-card animated-card"
            key={opt.id}
            onClick={() => handleOptionClick(opt)}
          >
            <span className="more-option-icon">{opt.icon}</span>
            <span className="more-option-label">{opt.label}</span>
          </div>
        ))}
        <button className="logout-btn" onClick={() => navigate('/homepage')}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </button>
      </div>
      {showMithoDialog && <MithoPointsDialog />}
      {showKhanaDialog && <KhanaKhajanDialog />}
      {showPurchaseTrend && <PurchaseTrendDialog />}
      {showSettingsDialog && <SettingsDialogComponent />}
      {showProfileDialog && <ProfileDialogComponent />}
      {showMithoBitesDialog && <MithoBitesDialogComponent />}
    </section>
  );
};

export default MoreOptionsSection; 
