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
import ProtectedRoute from '../components/ProtectedRoute';
import Settings from '../pages/client/Settings';
import Profile from '../pages/client/Profile';
import GKFood from '../pages/client/GKFood';
import KhanaKhajan from '../pages/client/KhanaKhajan';
import UpdateProfile from '../pages/client/UpdateProfile';
import ChangePassword from '../pages/client/ChangePassword';
import Orders from '../pages/client/orders';
import TransactionHistory from '../pages/admin/TransactionHistory';
import TransactionDetails from '../pages/admin/TransactionDetails';
import BusinessRiseFlows from '../pages/admin/BusinessRiseFlows';
import OrderManagement from '../pages/admin/OrderManagement';
import SystemLogs from '../pages/admin/SystemLogs';
import SessionTracking from '../pages/admin/SessionTracking';
import AdminLayout from '../layouts/AdminLayout';

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
        
        {/* Protected User Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/paymentmethod" element={<ProtectedRoute><PaymentMethod /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartDialog /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/more/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/more/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/more/gkfood" element={<ProtectedRoute><GKFood /></ProtectedRoute>} />
        <Route path="/more/khanakhajan" element={<ProtectedRoute><KhanaKhajan /></ProtectedRoute>} />
        <Route path="/more/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/settings/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        <Route path="/profile/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

        {/* Protected Admin Routes */}
        <Route path="/admin/adminpage" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/admin/product" element={<AdminRoute><ProductManagement /></AdminRoute>} />
        <Route path="/admin/product/:id/edit" element={<AdminRoute><UpdateProduct /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
        <Route path="/admin/category/create" element={<AdminRoute><CreateCategory /></AdminRoute>} />
        <Route path="/admin/users/create" element={<AdminRoute><CreateUser /></AdminRoute>} />
        <Route path="/admin/category" element={<AdminRoute><CategoryManagement /></AdminRoute>} />
        <Route path="/admin/category/:id" element={<AdminRoute><ViewCategory /></AdminRoute>} />
        <Route path="/admin/category/:id/edit" element={<AdminRoute><UpdateCategory /></AdminRoute>} />
        <Route path="/admin/users/:id/edit" element={<AdminRoute><UpdateUser /></AdminRoute>} />
        <Route path="/admin/adminsettings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />
        <Route path="/admin/restaurant/create" element={<AdminRoute><CreateRestaurant /></AdminRoute>} />
        <Route path="/admin/restaurant" element={<AdminRoute><RestaurantManagement /></AdminRoute>} />
        <Route path="/admin/restaurant/:id" element={<AdminRoute><ViewRestaurant /></AdminRoute>} />
        <Route path="/admin/restaurant/:id/edit" element={<AdminRoute><UpdateRestaurant /></AdminRoute>} />
        <Route path="/admin/transaction-history" element={<AdminRoute><TransactionHistory /></AdminRoute>} />
        <Route path="/admin/transaction-details/:id" element={<AdminRoute><TransactionDetails /></AdminRoute>} />
        <Route path="/admin/business-rise-flows" element={<AdminRoute><BusinessRiseFlows /></AdminRoute>} />
        <Route path="/admin/place-order" element={<AdminRoute><OrderManagement /></AdminRoute>} />
        <Route path="/admin/activity-log" element={<AdminRoute><SystemLogs /></AdminRoute>} />
        <Route path="/admin/session-tracking" element={<AdminRoute><SessionTracking /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

