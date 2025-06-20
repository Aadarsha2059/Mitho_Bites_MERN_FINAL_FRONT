import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      // If already in cart, increase quantity
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // --- Order Management ---
  const placeOrder = (order) => {
    setOrders((prev) => [
      {
        ...order,
        id: `MB-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      )
    );
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart, getCartTotal, updateQuantity,
      orders, placeOrder, cancelOrder, updateOrderStatus
    }}>
      {children}
    </CartContext.Provider>
  );
} 