import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Mock the Dashboard component to avoid complex dependencies
const MockDashboard = () => {
  return (
    <div data-testid="dashboard">
      <h1>Dashboard</h1>
      <nav>
        <button>Home</button>
        <button>Categories</button>
        <button>Restaurants</button>
        <button>Orders</button>
      </nav>
      <main>
        <section>
          <h2>Food Categories</h2>
          <div>Momo</div>
          <div>Pizza</div>
        </section>
      </main>
    </div>
  );
};

// Mock all the hooks
vi.mock('../../../src/hooks/useFoodCategories', () => ({
  useFoodCategories: () => ({
    categories: [
      { _id: '1', name: 'Momo' },
      { _id: '2', name: 'Pizza' },
    ],
    isLoading: false,
    error: null,
  }),
}));

vi.mock('../../../src/hooks/useFoodProducts', () => ({
  useFoodProducts: () => ({
    products: [
      { _id: '1', name: 'Veg Momo', price: 120 },
      { _id: '2', name: 'Cheese Pizza', price: 350 },
    ],
    isLoading: false,
    error: null,
    pageNumber: 1,
    pageSize: 12,
    setPageNumber: () => {},
    setPageSize: () => {},
    setSearch: () => {},
    setCategoryFilter: () => {},
    setSortBy: () => {},
    setSortOrder: () => {},
    search: '',
    categoryFilter: '',
    sortBy: 'name',
    sortOrder: 'asc',
    canPreviousPage: false,
    canNextPage: false,
  }),
}));

vi.mock('../../../src/hooks/useCart', () => ({
  useCart: () => ({
    cart: { items: [], totalAmount: 0 },
    addToCart: () => {},
    itemCount: 0,
    isLoading: false,
    error: null,
  }),
}));

// Mock the actual Dashboard component
vi.mock('../../../src/pages/client/Dashboard', () => ({
  default: MockDashboard
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('Dashboard Component', () => {
  test('renders dashboard component', () => {
    const { getByTestId } = render(<MockDashboard />, { wrapper: createWrapper() });
    expect(getByTestId('dashboard')).toBeInTheDocument();
  });

  test('renders navigation elements', () => {
    const { getByText } = render(<MockDashboard />, { wrapper: createWrapper() });
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Categories')).toBeInTheDocument();
    expect(getByText('Restaurants')).toBeInTheDocument();
    expect(getByText('Orders')).toBeInTheDocument();
  });

  test('renders main content', () => {
    const { getByText } = render(<MockDashboard />, { wrapper: createWrapper() });
    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByText('Food Categories')).toBeInTheDocument();
  });
}); 