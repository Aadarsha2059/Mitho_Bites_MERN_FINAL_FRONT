import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const adminOptions = [
  { id: 'adminpage', label: 'Dashboard', icon: '📊' },
  { id: 'product', label: 'Products', icon: '🍔' },
  { id: 'users', label: 'Users', icon: '👤' },
  { id: 'category', label: 'Categories', icon: '📂' },
  { id: 'restaurant', label: 'Restaurants', icon: '🏪' },
  { id: 'place-order', label: 'Place Order', icon: '📦' },
  { id: 'transaction-history', label: 'Transactions', icon: '💳' },
  { id: 'activity-log', label: 'Activity Log', icon: '📋' },
  { id: 'business-rise-flows', label: 'Business Trends', icon: '📈' },
  { id: 'adminsettings', label: 'Settings', icon: '⚙️' },
];

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#ffffff' }}>
      <Sidebar options={adminOptions} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1, padding: '32px 24px', background: '#ffffff', minHeight: 0, overflow: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
} 
