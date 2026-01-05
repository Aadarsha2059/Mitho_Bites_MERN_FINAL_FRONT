import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getCartService, 
  addToCartService, 
  updateCartItemService, 
  removeFromCartService, 
  clearCartService 
} from '../../services/cartService';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const queryClient = useQueryClient();
  const [localCart, setLocalCart] = useState([]); // Fallback for offline state

  // Fetch cart from backend
  const { data: cartData, isLoading: cartLoading, error: cartError } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartService,
    retry: 1,
    onError: (error) => {
      console.error('Failed to fetch cart:', error);
      // Use local cart as fallback
    }
  });

  // Use backend cart data or fallback to local cart
  const cart = cartData?.data?.items || localCart || [];

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: addToCartService,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Item added to cart!');
    },
    onError: (error) => {
      console.error('Add to cart error:', error);
      toast.error(error.message || 'Failed to add item to cart');
      
      // Fallback to local cart
      setLocalCart(prev => {
        const existing = prev.find(item => item._id === error.productId);
        if (existing) {
          return prev.map(item =>
            item._id === error.productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...error.product, quantity: 1 }];
      });
    }
  });

  // Update cart item mutation
  const updateCartItemMutation = useMutation({
    mutationFn: updateCartItemService,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Cart updated!');
    },
    onError: (error) => {
      console.error('Update cart error:', error);
      toast.error(error.message || 'Failed to update cart');
    }
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: removeFromCartService,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Item removed from cart!');
    },
    onError: (error) => {
      console.error('Remove from cart error:', error);
      toast.error(error.message || 'Failed to remove item from cart');
    }
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: clearCartService,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      setLocalCart([]); // Clear local cart too
      toast.success('Cart cleared!');
    },
    onError: (error) => {
      console.error('Clear cart error:', error);
      toast.error(error.message || 'Failed to clear cart');
    }
  });

  const addToCart = (product) => {
    // ✅ FIX: Don't send price - backend will get it from database to prevent manipulation
    // Price validation should only trigger when user modifies price in Burp Suite, not during normal add to cart
    const cartItem = {
      productId: product._id,
      quantity: 1
      // Price is intentionally omitted - backend will fetch from product database
    };

    addToCartMutation.mutate(cartItem);
  };

  const removeFromCart = (productId) => {
    removeFromCartMutation.mutate(productId);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    updateCartItemMutation.mutate({ productId, quantity });
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => {
      const price = item.price || (item.productId?.price) || 0;
      const quantity = item.quantity || 0;
      return sum + (price * quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Legacy order management (keeping for compatibility)
  const [orders, setOrders] = useState([]);

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
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartTotal, 
      updateQuantity,
      getCartItemCount,
      cartLoading,
      cartError,
      orders, 
      placeOrder, 
      cancelOrder, 
      updateOrderStatus
    }}>
      {children}
    </CartContext.Provider>
  );
} 
