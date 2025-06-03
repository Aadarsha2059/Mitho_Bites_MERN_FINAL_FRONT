// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import SignUp from '../pages/SignupPage';
import MainLayout from '../layouts/MainLayout';
import SignUpPage from '../pages/SignupPage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import LoginTest from '../state_manage/LoginTest';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes using layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>

        {/* Standalone pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage/>} />
         <Route path="/about" element={<About/>} />
         <Route path="/contact" element={<Contact/>} />
         <Route path="/login-test" element={<LoginTest/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}
