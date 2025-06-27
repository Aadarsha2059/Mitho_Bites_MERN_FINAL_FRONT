// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import SignUpPage from '../pages/SignupPage';
import Login from '../pages/Login';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Dashboard from '../pages/client/Dashboard';
import LoginTest from '../state_manage/LoginTest';
import WhatsCooking from '../pages/Menu';
import AdminPage from '../pages/admin/AdminPage';
import ProductManagement from '../pages/admin/ProductManagement'; 
import UpdateProduct from '../pages/admin/UpdateProduct';
import MainLayout from '../layouts/MainLayout';
import GuestRouter from './GuestRouter';
import NormalUserRoute from './NormalUserRoute';
import CartDialog from '../pages/client/cart/CartDialog';
import UserManagement from '../pages/admin/UserManagement';
import CreateCategory from '../pages/admin/CreateCategory';
import CategoryManagement from '../pages/admin/CategoryManagement';
import CreateRestaurant from '../pages/admin/CreateRestaurant';
import RestaurantManagement from '../pages/admin/RestaurantManagement';
import ViewRestaurant from '../pages/admin/ViewRestaurant';
import UpdateRestaurant from '../pages/admin/UpdateRestaurant';
import CreateUser from '../pages/admin/CreateUser';
import AdminSettingsPage from '../pages/admin/AdminSettings';
import ViewCategory from '../pages/admin/ViewCategory';
import UpdateCategory from '../pages/admin/UpdateCategory';
import UpdateUser from '../pages/admin/UpdateUser';
import PaymentMethod from '../pages/client/PaymentMethod';
import AdminRoute from '../components/AdminRoute';
import Settings from '../pages/client/Settings';
import Profile from '../pages/client/Profile';
import GKFood from '../pages/client/GKFood';
import KhanaKhajan from '../pages/client/KhanaKhajan';
import UpdateProfile from '../pages/client/UpdateProfile';

export default function AppRouter() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        {/* Root route */}
        <Route path="/" element={<Homepage />} />
        
        {/* Main Layout Route */}
        <Route element={<MainLayout />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<WhatsCooking />} />
          
        </Route>

        {/* Guest Routes (e.g., signup) */}
        <Route element={<GuestRouter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        {/* Other Routes */}
        <Route path="/login-test" element={<LoginTest />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/paymentmethod" element={<PaymentMethod />} />
        <Route path="/cart" element={<CartDialog/>} />
        <Route path="/more/settings" element={<Settings />} />
        <Route path="/more/profile" element={<Profile />} />
        <Route path="/more/gkfood" element={<GKFood />} />
        <Route path="/more/khanakhajan" element={<KhanaKhajan />} />
        <Route path="/more/update-profile" element={<UpdateProfile />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={<AdminRoute>{
          <Routes>
            <Route path="adminpage" element={<AdminPage />} />
            <Route path="product" element={<ProductManagement />} />
            <Route path="product/:id/edit" element={<UpdateProduct />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="category/create" element={<CreateCategory />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="category" element={<CategoryManagement />} />
            <Route path="category/:id" element={<ViewCategory />} />
            <Route path="category/:id/edit" element={<UpdateCategory />} />
            <Route path="users/:id/edit" element={<UpdateUser />} />
            <Route path="adminsettings" element={<AdminSettingsPage />} />
            <Route path="restaurant/create" element={<CreateRestaurant />} />
            <Route path="restaurant" element={<RestaurantManagement />} />
            <Route path="restaurant/:id" element={<ViewRestaurant />} />
            <Route path="restaurant/:id/edit" element={<UpdateRestaurant />} />
          </Routes>
        }</AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
