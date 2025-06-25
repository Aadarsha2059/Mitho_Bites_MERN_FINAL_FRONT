import React, { useState } from 'react'
import Header from './HomepageHeader'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ChatbotFood from '../pages/client/chatbotfood'
import ModalContainer from '../components/common/ModalContainer'
import LoginForm from '../components/authh/LoginForm'

export default function MainLayout() {
  const [loginOpen, setLoginOpen] = useState(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  return (
    <>
      <div>
          <Header onLoginClick={openLogin}/>
          <Outlet/>
          <Footer/>
          <ChatbotFood/>
      </div>
      <ModalContainer 
        isOpen={loginOpen} 
        onClose={closeLogin} 
        title="Welcome Back to Mitho Bites"
        style={{ zIndex: 999999 }}
      >
        <LoginForm />
      </ModalContainer>
    </>
  )
}

