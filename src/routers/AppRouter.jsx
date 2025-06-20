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
import ProductManagement from '../pages/admin/ProductManagement'; 
import MainLayout from '../layouts/MainLayout';
import GuestRouter from './GuestRouter';
import NormalUserRoute from './NormalUserRoute';
import CartDialog from '../pages/client/cart/CartDialog';
import UserManagement from '../pages/admin/UserManagement';
import CreateCategory from '../pages/admin/CreateCategory';
import CategoryManagement from '../pages/admin/CategoryManagement';
import CreateUser from '../pages/admin/CreateUser';
import AdminSettingsPage from '../pages/admin/AdminSettings';
import ViewCategory from '../pages/admin/ViewCategory';
import UpdateCategory from '../pages/admin/UpdateCategory';
import UpdateUser from '../pages/admin/UpdateUser';
import PaymentMethod from '../pages/client/PaymentMethod';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Route */}
        <Route element={<MainLayout />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<WhatsCooking />} />
          
        </Route>

        {/* Guest Routes (e.g., login/signup) */}
        <Route element={<GuestRouter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpPage />} />
        </Route>

        {/* Other Routes */}
        <Route path="/login-test" element={<LoginTest />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/paymentmethod" element={<PaymentMethod />} />
         <Route path="/cart" element={<CartDialog/>} />

        
        


        {/* Nested Admin Routes */}
        <Route path="/admin/*">
          <Route path="adminpage" element={<AdminPage />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="category/create" element={<CreateCategory />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="category" element={<CategoryManagement />} />
          <Route path="category/:id" element={<ViewCategory />} />
          <Route path="category/:id/edit" element={<UpdateCategory />} />
          <Route path="users/:id/edit" element={<UpdateUser />} />
          <Route path="adminsettings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
