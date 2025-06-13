// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import SignUpPage from '../pages/SignupPage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import LoginTest from '../state_manage/LoginTest';
import WhatsCooking from '../pages/Menu';
import AdminPage from '../pages/admin/AdminPage';
import ProductManagement from '../pages/admin/ProductManagement'; // Make sure this file exists
import MainLayout from '../layouts/MainLayout';
import GuestRouter from './GuestRouter';
import NormalUserRoute from './NormalUserRoute';
import CartDialog from '../components/cart/CartDialog';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<WhatsCooking />} />
          <Route path="/cart" element={<CartDialog/>} />
        </Route>

        {/* Guest Routes (e.g., login/signup) */}
        <Route element={<GuestRouter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpPage />} />
        </Route>

        {/* Other Routes */}
        <Route path="/login-test" element={<LoginTest />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminpage" element={<AdminPage />} />

        {/* Nested Admin Routes */}
        <Route path="/admin/*">
          <Route path="product" element={<ProductManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
