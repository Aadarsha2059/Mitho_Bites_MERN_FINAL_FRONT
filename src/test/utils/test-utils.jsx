import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../../auth/authProvider';
import { CartProvider } from '../../pages/client/CartContext';

// Create a custom render function that includes providers
export function renderWithProviders(ui, options = {}) {
  const {
    preloadedState = {},
    // Automatically create a new client instance for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    }),
    ...renderOptions
  } = options;

  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <CartProvider>
              {children}
            </CartProvider>
          </QueryClientProvider>
        </AuthContextProvider>
      </BrowserRouter>
    );
  }

  // Return an object with the client and all of RTL's render functions
  return {
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { renderWithProviders as render }; 
