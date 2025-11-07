import React from 'react'
import Header from './HomepageHeader'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ChatbotFood from '../pages/client/chatbotfood'

export default function MainLayout() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
        <ChatbotFood/>
    </div>
  )
}


