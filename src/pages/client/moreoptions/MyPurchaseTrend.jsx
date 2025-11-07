import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { FaTimes, FaChartLine } from "react-icons/fa";
import "./KhanaKhajan.css";

const fetchTrendData = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5050/api/orders/trend", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (data.success) return data.data;
  throw new Error("Failed to fetch trend data");
};

const chartOptions = (label, color, maxY) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { mode: "index", intersect: false },
  },
  scales: {
    x: {
      title: { display: true, text: "Days", color: "#2d2346", font: { weight: "bold" } },
      ticks: { color: "#2d2346" },
      grid: { color: "#f3e6ff" },
    },
    y: {
      min: 0,
      max: maxY,
      title: { display: true, text: label, color, font: { weight: "bold" } },
      ticks: { color },
      grid: { color: "#f3e6ff" },
    },
  },
});

const MyPurchaseTrend = ({ onClose }) => {
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrendData()
      .then(setTrend)
      .catch(() => setError("Could not load trend data."))
      .finally(() => setLoading(false));
  }, []);

  const days = trend.map((d) => d.date?.slice(5));
  const itemsData = trend.map((d) => d.itemsReceived);
  const amountData = trend.map((d) => d.totalAmount);

  return (
    <div className="mitho-dialog-overlay" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.25)',zIndex:3000}}>
      <div className="mitho-dialog" style={{
        background:'linear-gradient(135deg, #f8f9fa 0%, #e0c3fc 100%)',
        borderRadius:'2.5rem',
        boxShadow:'0 16px 64px #a18cd133, 0 2px 12px #0001',
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
        border:'2.5px solid #e0c3fc',
      }}>
        <button onClick={onClose} style={{position:'absolute',top:22,right:38,background:'none',border:'none',fontSize:'2.3rem',color:'#e53935',cursor:'pointer',zIndex:3200}}><FaTimes/></button>
        <div style={{display:'flex',alignItems:'center',gap:'18px',marginBottom:'28px',justifyContent:'center'}}>
          <FaChartLine style={{fontSize:'2.7rem',color:'#7b1fa2'}}/>
          <h2 style={{margin:0,fontWeight:800,fontSize:'2.3rem',color:'#7b1fa2',letterSpacing:'1.2px'}}>My Purchase Trend</h2>
        </div>
        {loading ? (
          <div style={{textAlign:'center',padding:'24px 0'}}>Loading...</div>
        ) : error ? (
          <div style={{color:'#e53935',fontWeight:700,fontSize:'1.2rem'}}>{error}</div>
        ) : (
          <>
            <div style={{width:'100%',background:'#fff',borderRadius:'1.7rem',boxShadow:'0 2px 12px #0001',marginBottom:'28px',padding:'28px 22px'}}>
              <div style={{fontWeight:800,fontSize:'1.25rem',color:'#e53935',marginBottom:'10px'}}>Items Received (Last 7 Days)</div>
              <div style={{height:'220px',width:'100%'}}>
                <Line
                  data={{
                    labels: days,
                    datasets: [
                      {
                        label: 'Items Received',
                        data: itemsData,
                        borderColor: '#e53935',
                        backgroundColor: 'rgba(229,57,53,0.12)',
                        pointBackgroundColor: '#e53935',
                        pointBorderColor: '#fff',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3,
                      },
                    ],
                  }}
                  options={chartOptions('Items', '#e53935', 10)}
                />
              </div>
            </div>
            <div style={{width:'100%',background:'#fff',borderRadius:'1.7rem',boxShadow:'0 2px 12px #0001',marginBottom:'28px',padding:'28px 22px'}}>
              <div style={{fontWeight:800,fontSize:'1.25rem',color:'#7b1fa2',marginBottom:'10px'}}>Amount Spent (Last 7 Days)</div>
              <div style={{height:'220px',width:'100%'}}>
                <Line
                  data={{
                    labels: days,
                    datasets: [
                      {
                        label: 'Amount Spent',
                        data: amountData,
                        borderColor: '#7b1fa2',
                        backgroundColor: 'rgba(123,31,162,0.12)',
                        pointBackgroundColor: '#7b1fa2',
                        pointBorderColor: '#fff',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3,
                      },
                    ],
                  }}
                  options={chartOptions('Amount (Rs)', '#7b1fa2', 2000)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPurchaseTrend; 
