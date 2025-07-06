import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCart } from '../../../src/hooks/useCart';

// Mock the services
vi.mock('../../../src/services/cartService', () => ({
  getCartService: vi.fn(() => Promise.resolve({
    data: { items: [], totalAmount: 0 }
  })),
  addToCartService: vi.fn(),
  updateCartItemService: vi.fn(),
  removeFromCartService: vi.fn(),
  clearCartService: vi.fn()
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { 
        retry: false,
        staleTime: Infinity,
        cacheTime: Infinity
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useCart Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should return hook with expected properties', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    // Test that all expected properties exist
    expect(result.current).toHaveProperty('cart');
    expect(result.current).toHaveProperty('itemCount');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('addToCart');
    expect(result.current).toHaveProperty('updateCartItem');
    expect(result.current).toHaveProperty('removeFromCart');
    expect(result.current).toHaveProperty('clearCart');
    expect(result.current).toHaveProperty('refetch');
  });

  test('should have default cart structure', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    expect(result.current.cart).toEqual({ items: [], totalAmount: 0 });
    expect(result.current.itemCount).toBe(0);
  });

  test('should have function properties', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.addToCart).toBe('function');
    expect(typeof result.current.updateCartItem).toBe('function');
    expect(typeof result.current.removeFromCart).toBe('function');
    expect(typeof result.current.clearCart).toBe('function');
    expect(typeof result.current.refetch).toBe('function');
  });

  test('should have loading state properties', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.isLoading).toBe('boolean');
    expect(result.current).toHaveProperty('isAddingToCart');
    expect(result.current).toHaveProperty('isUpdatingCart');
    expect(result.current).toHaveProperty('isRemovingFromCart');
    expect(result.current).toHaveProperty('isClearingCart');
  });

  test('should handle cart operations without errors', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    // Test that calling operations doesn't throw errors
    expect(() => result.current.addToCart('1', 2)).not.toThrow();
    expect(() => result.current.updateCartItem('1', 3)).not.toThrow();
    expect(() => result.current.removeFromCart('1')).not.toThrow();
    expect(() => result.current.clearCart()).not.toThrow();
  });

  test('should have error property', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    expect(result.current.error).toBeDefined();
  });
}); 