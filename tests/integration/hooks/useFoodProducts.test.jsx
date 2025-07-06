import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFoodProducts } from '../../../src/hooks/useFoodProducts';

// Mock the service to return a resolved promise immediately
vi.mock('../../../src/services/foodProductService', () => ({
  getAllFoodProductsService: vi.fn(() => Promise.resolve({
    data: [],
    pagination: { page: 1, totalPages: 1, limit: 12 }
  }))
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

describe('useFoodProducts Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should return hook with expected properties', () => {
    const { result } = renderHook(() => useFoodProducts(), {
      wrapper: createWrapper(),
    });

    // Test that all expected properties exist
    expect(result.current).toHaveProperty('pageNumber');
    expect(result.current).toHaveProperty('pageSize');
    expect(result.current).toHaveProperty('search');
    expect(result.current).toHaveProperty('categoryFilter');
    expect(result.current).toHaveProperty('sortBy');
    expect(result.current).toHaveProperty('sortOrder');
    expect(result.current).toHaveProperty('products');
    expect(result.current).toHaveProperty('pagination');
    expect(result.current).toHaveProperty('canNextPage');
    expect(result.current).toHaveProperty('canPreviousPage');
  });

  test('should have default values', () => {
    const { result } = renderHook(() => useFoodProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.pageNumber).toBe(1);
    expect(result.current.pageSize).toBe(12);
    expect(result.current.search).toBe('');
    expect(result.current.categoryFilter).toBe('');
    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('asc');
  });

  test('should have setter functions', () => {
    const { result } = renderHook(() => useFoodProducts(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.setSearch).toBe('function');
    expect(typeof result.current.setCategoryFilter).toBe('function');
    expect(typeof result.current.setPageNumber).toBe('function');
    expect(typeof result.current.setPageSize).toBe('function');
    expect(typeof result.current.setSortBy).toBe('function');
    expect(typeof result.current.setSortOrder).toBe('function');
  });

  test('should have pagination properties', () => {
    const { result } = renderHook(() => useFoodProducts(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.canPreviousPage).toBe('boolean');
    expect(typeof result.current.canNextPage).toBe('boolean');
    expect(typeof result.current.pagination).toBe('object');
  });

  test('should have products array', () => {
    const { result } = renderHook(() => useFoodProducts(), {
      wrapper: createWrapper(),
    });

    expect(Array.isArray(result.current.products)).toBe(true);
  });

  test('should have query properties', () => {
    const { result } = renderHook(() => useFoodProducts(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.isLoading).toBe('boolean');
    expect(result.current.error).toBeDefined();
    expect(typeof result.current.refetch).toBe('function');
  });
}); 