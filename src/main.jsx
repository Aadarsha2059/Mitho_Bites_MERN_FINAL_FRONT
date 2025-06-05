// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import AppRouter from './routers/AppRouter.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        theme="dark"
        transition={Slide}
      />
    </QueryClientProvider>
  </StrictMode>
);
