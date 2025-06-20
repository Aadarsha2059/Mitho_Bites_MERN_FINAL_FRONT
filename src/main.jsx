import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routers/AppRouter.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'
import AuthContextProvider from './auth/authProvider.jsx'
import { CartProvider } from './pages/client/CartContext'
const queryClient= new QueryClient() 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
       <QueryClientProvider client={queryClient}>
        <CartProvider>
          <AppRouter />
        </CartProvider>
        <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        theme='dark'
        transition={Slide} // Bouce, slide,zoom,flip
        />

    </QueryClientProvider>

    </AuthContextProvider>
   
  
  </StrictMode>,
)
