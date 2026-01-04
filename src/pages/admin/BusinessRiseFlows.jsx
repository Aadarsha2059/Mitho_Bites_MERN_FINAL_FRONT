import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import './BusinessRiseFlows.css';
import { FaUsers, FaListUl, FaHamburger, FaCommentDots, FaShoppingCart, FaMoneyCheckAlt, FaUtensils } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const iconStyle = { marginRight: 8, verticalAlign: 'middle' };

const BusinessRiseFlows = () => {
  const navigate = useNavigate();
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      setLoading(true);
      setError(null);
      try {
        // ✅ CORS FIX: Use full backend URL to ensure CORS headers are sent
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/dashboard/business-trends`, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (data.success) {
          setTrends(data.data);
        } else {
          setError('Failed to fetch business trends');
        }
      } catch (err) {
        console.error('Business trends fetch error:', err);
        setError('Failed to fetch business trends');
      }
      setLoading(false);
    };
    fetchTrends();
  }, []);

  if (loading) return <div className="business-rise-flows-container"><h2>Business Rise Flows</h2><p>Loading...</p></div>;
  if (error) return <div className="business-rise-flows-container"><h2>Business Rise Flows</h2><p className="error">{error}</p><p style={{color:'#b71c1c',marginTop:12}}>Please check your backend server logs for more details.</p></div>;
  if (!trends) return <div className="business-rise-flows-container"><h2>Business Rise Flows</h2><p>No data available.</p></div>;

  // Defensive fallback for trends fields
  const safe = (v, fallback) => (Array.isArray(fallback) ? (Array.isArray(v) ? v : fallback) : (v ?? fallback));
  const months = safe(trends.months, []);
  const usersSeries = safe(trends.usersSeries, Array(months.length).fill(0));
  const restaurantsSeries = safe(trends.restaurantsSeries, Array(months.length).fill(0));
  const productsSeries = safe(trends.productsSeries, Array(months.length).fill(0));
  const ordersSeries = safe(trends.ordersSeries, Array(months.length).fill(0));
  const revenueSeries = safe(trends.revenueSeries, Array(months.length).fill(0));
  const feedbackStars = safe(trends.feedbackStars, [0,0,0,0,0]);
  const totalRevenue = safe(trends.totalRevenue, 0);
  const paymentTypeCounts = safe(trends.paymentTypeCounts, [0,0,0,0,0]);
  const paymentTypeLabels = safe(trends.paymentTypeLabels, ['cash','online','card','esewa','khalti']);
  const totalUsers = safe(trends.totalUsers, 0);
  const totalRestaurants = safe(trends.totalRestaurants, 0);
  const totalProducts = safe(trends.totalProducts, 0);
  const totalOrders = safe(trends.totalOrders, 0);
  const totalCategories = safe(trends.totalCategories, 0);
  const totalPayments = safe(trends.totalPayments, 0);

  // Chart data
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    animation: { duration: 800, easing: 'easeInOutQuart' },
    scales: {
      y: { beginAtZero: true, grid: { color: '#e2e8f0' } },
      x: { grid: { color: '#e2e8f0' } }
    },
  };

  const straightLineOptions = {
    ...chartOptions,
    elements: {
      line: { tension: 0, borderWidth: 3 },
      point: { radius: 0, hoverRadius: 5 }
    },
    scales: {
      ...chartOptions.scales,
      x: {
        ...chartOptions.scales.x,
        title: { display: true, text: 'Index (1-12)', font: { weight: 'bold' } },
        ticks: { callback: (v) => v }
      },
      y: {
        ...chartOptions.scales.y,
        max: 12
      }
    }
  };

  // Helper for dynamic y-axis ticks
  function getYAxisOptions(dataArr, type = 'default') {
    if (type === 'users' || type === 'restaurants' || type === 'food') {
      return {
        min: 0,
        max: 30,
        ticks: {
          stepSize: 5,
          callback: (v) => v
        }
      };
    }
    if (type === 'orders') {
      return {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (v) => v
        }
      };
    }
    // fallback: one step higher than max
    const max = Math.max(...dataArr, 0);
    let step = 1;
    if (max > 10 && max <= 20) step = 5;
    else if (max > 20) step = 10;
    const yMax = max === 0 ? 1 : max + step;
    return {
      min: 0,
      max: yMax,
      ticks: {
        stepSize: step,
        callback: (v) => v
      }
    };
  }

  // Only visualize 'Cash' and 'Online' payment types
  const paymentPieLabels = ['Cash', 'Online'];
  const paymentPieData = [paymentTypeCounts[0] || 0, paymentTypeCounts[1] || 0];
  const paymentPieColors = ['#4c51bf', '#ed8936'];

  return (
    <div className="business-rise-flows-container">
      <button
        className="admin-back-button"
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 100,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '2rem',
          padding: '0.7rem 1.6rem',
          fontWeight: 700,
          fontSize: '1.1rem',
          boxShadow: '0 4px 16px rgba(76,81,191,0.13)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
        }}
        onClick={() => navigate('/admin/adminpage')}
      >
        ← Back
      </button>
      <h2 className="business-rise-title">Business Rise Flows</h2>
      <div className="business-rise-summary-card animate-fade-in" style={{ marginBottom: 32 }}>
        <div className="business-rise-icon-wrapper">
          <FaMoneyCheckAlt color="#764ba2" size={32} style={iconStyle} />
        </div>
        <div className="business-rise-summary-info">
          <span className="business-rise-summary-label">Total Revenue</span>
          <span className="business-rise-summary-value">NPR {Number(totalRevenue).toLocaleString()}</span>
        </div>
      </div>
      <div className="business-rise-grid">
        <div className="business-rise-section">
          <h3>1. <FaUsers style={iconStyle}/> Users Growth</h3>
          <div className="business-rise-total">Total Users: <b>{totalUsers}</b></div>
          <Line data={{
            labels: months,
            datasets: [{
              label: 'Users',
              data: usersSeries,
              borderColor: '#4c51bf',
              backgroundColor: 'rgba(76,81,191,0.08)',
              fill: false,
              tension: 0.3,
              pointRadius: 6,
              pointHoverRadius: 10,
              borderWidth: 4,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#4c51bf',
              pointBorderWidth: 3,
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowBlur: 10,
              shadowColor: 'rgba(76,81,191,0.25)',
            }],
          }} options={{
            ...straightLineOptions,
            elements: {
              ...straightLineOptions.elements,
              point: { radius: 6, hoverRadius: 10, backgroundColor: '#fff', borderColor: '#4c51bf', borderWidth: 3 },
              line: { tension: 0.3, borderWidth: 4 },
            },
            plugins: {
              ...straightLineOptions.plugins,
              legend: { display: false },
              tooltip: { enabled: true },
            },
            scales: {
              ...straightLineOptions.scales,
              x: {
                ...straightLineOptions.scales.x,
                title: { display: true, text: 'Month', font: { weight: 'bold' } },
                ticks: { font: { size: 14, weight: 'bold' } }
              },
              y: getYAxisOptions(usersSeries, 'users')
            }
          }} />
        </div>
        <div className="business-rise-section">
          <h3>2. <FaUtensils style={iconStyle}/> Restaurants Growth</h3>
          <div className="business-rise-total">Total Restaurants: <b>{totalRestaurants}</b></div>
          {/* Restaurants Growth Line Chart (Chart.js) */}
          <Line data={{
            labels: months,
            datasets: [{
              label: 'Restaurants',
              data: restaurantsSeries,
              borderColor: '#667eea',
              backgroundColor: 'rgba(102,126,234,0.08)',
              fill: false,
              tension: 0.3,
              pointRadius: 6,
              pointHoverRadius: 10,
              borderWidth: 4,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#667eea',
              pointBorderWidth: 3,
            }],
          }} options={{
            ...straightLineOptions,
            elements: {
              ...straightLineOptions.elements,
              point: { radius: 6, hoverRadius: 10, backgroundColor: '#fff', borderColor: '#667eea', borderWidth: 3 },
              line: { tension: 0.3, borderWidth: 4 },
            },
            plugins: {
              ...straightLineOptions.plugins,
              legend: { display: false },
              tooltip: { enabled: true },
            },
            scales: {
              ...straightLineOptions.scales,
              x: {
                ...straightLineOptions.scales.x,
                title: { display: true, text: 'Month', font: { weight: 'bold' } },
                ticks: { font: { size: 14, weight: 'bold' } }
              },
              y: getYAxisOptions(restaurantsSeries, 'restaurants')
            }
          }} />
        </div>
        <div className="business-rise-section">
          <h3>3. <FaHamburger style={iconStyle}/> Food Items Added</h3>
          <div className="business-rise-total">Total Food Items: <b>{totalProducts}</b></div>
          <Line data={{
            labels: months,
            datasets: [{
              label: 'Food Items',
              data: productsSeries,
              borderColor: '#48bb78',
              backgroundColor: 'rgba(72,187,120,0.08)',
              fill: false,
              tension: 0.3,
              pointRadius: 6,
              pointHoverRadius: 10,
              borderWidth: 4,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#48bb78',
              pointBorderWidth: 3,
            }],
          }} options={{
            ...straightLineOptions,
            elements: {
              ...straightLineOptions.elements,
              point: { radius: 6, hoverRadius: 10, backgroundColor: '#fff', borderColor: '#48bb78', borderWidth: 3 },
              line: { tension: 0.3, borderWidth: 4 },
            },
            plugins: {
              ...straightLineOptions.plugins,
              legend: { display: false },
              tooltip: { enabled: true },
            },
            scales: {
              ...straightLineOptions.scales,
              x: {
                ...straightLineOptions.scales.x,
                title: { display: true, text: 'Month', font: { weight: 'bold' } },
                ticks: { font: { size: 14, weight: 'bold' } }
              },
              y: getYAxisOptions(productsSeries, 'food')
            }
          }} />
        </div>
        <div className="business-rise-section">
          <h3>4. <FaShoppingCart style={iconStyle}/> Orders Placed</h3>
          <div className="business-rise-total">Total Orders: <b>{totalOrders}</b></div>
          <Line data={{
            labels: months,
            datasets: [{
              label: 'Orders',
              data: ordersSeries,
              borderColor: '#4299e1',
              backgroundColor: 'rgba(66,153,225,0.08)',
              fill: false,
              tension: 0.3,
              pointRadius: 6,
              pointHoverRadius: 10,
              borderWidth: 4,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#4299e1',
              pointBorderWidth: 3,
            }],
          }} options={{
            ...straightLineOptions,
            elements: {
              ...straightLineOptions.elements,
              point: { radius: 6, hoverRadius: 10, backgroundColor: '#fff', borderColor: '#4299e1', borderWidth: 3 },
              line: { tension: 0.3, borderWidth: 4 },
            },
            plugins: {
              ...straightLineOptions.plugins,
              legend: { display: false },
              tooltip: { enabled: true },
            },
            scales: {
              ...straightLineOptions.scales,
              x: {
                ...straightLineOptions.scales.x,
                title: { display: true, text: 'Month', font: { weight: 'bold' } },
                ticks: { font: { size: 14, weight: 'bold' } }
              },
              y: getYAxisOptions(ordersSeries, 'orders')
            }
          }} />
        </div>
        <div className="business-rise-section">
          <h3>5. <FaCommentDots style={iconStyle}/> Feedback Star Distribution</h3>
          <div className="business-rise-total">Total Feedbacks: <b>{feedbackStars.reduce((a,b)=>a+b,0)}</b></div>
          <Pie data={{
            labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
            datasets: [{
              label: 'Feedback Stars',
              data: feedbackStars,
              backgroundColor: [
                '#f56565', '#ed8936', '#f6e05e', '#48bb78', '#4c51bf'
              ],
              borderColor: '#fff',
              borderWidth: 2,
            }],
          }} options={{
            plugins: {
              legend: { display: true, position: 'right', labels: { font: { size: 16, weight: 'bold' } } },
              tooltip: { enabled: true },
            },
            animation: { duration: 800, easing: 'easeInOutQuart' },
          }} />
          <div className="business-rise-pie-totals">
            {feedbackStars.map((n, i) => (
              <span key={i}>{i+1}★: <b>{n}</b>{i<4?', ':''}</span>
            ))}
          </div>
        </div>
        <div className="business-rise-section">
          <h3>6. <FaMoneyCheckAlt style={iconStyle}/> Payment Type Distribution</h3>
          <div className="business-rise-total">Total Payments: <b>{totalPayments}</b></div>
          <Pie data={{
            labels: paymentPieLabels,
            datasets: [{
              label: 'Payment Types',
              data: paymentPieData,
              backgroundColor: paymentPieColors,
              borderColor: '#fff',
              borderWidth: 2,
            }],
          }} options={{
            plugins: {
              legend: { display: true, position: 'right', labels: { font: { size: 16, weight: 'bold' } } },
              tooltip: { enabled: true },
            },
            animation: { duration: 800, easing: 'easeInOutQuart' },
          }} />
          <div className="business-rise-pie-totals">
            {paymentPieLabels.map((label, i) => (
              <span key={i}>{label}: <b>{paymentPieData[i]}</b>{i<paymentPieLabels.length-1?', ':''}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Debug overlay for backend data (uncomment to use)
  // <pre style={{fontSize:'0.9rem',background:'#f7fafc',padding:'1rem',borderRadius:'1rem',marginTop:'2rem',overflow:'auto'}}>
  //   {JSON.stringify(trends, null, 2)}
  // </pre>
};

export default BusinessRiseFlows; 
