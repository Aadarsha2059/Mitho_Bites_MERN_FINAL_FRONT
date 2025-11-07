import { http, HttpResponse } from 'msw';

// Mock data
const mockCategories = [
  {
    _id: '1',
    name: 'Nepali Food',
    filepath: 'uploads/category1.jpg',
    image: 'http://localhost:5050/uploads/category1.jpg'
  },
  {
    _id: '2',
    name: 'Indian Food',
    filepath: 'uploads/category2.jpg',
    image: 'http://localhost:5050/uploads/category2.jpg'
  }
];

const mockProducts = [
  {
    _id: '1',
    name: 'Momo',
    description: 'Delicious Nepali dumplings',
    price: 250,
    filepath: 'uploads/momo.jpg',
    image: 'http://localhost:5050/uploads/momo.jpg',
    categoryId: { _id: '1', name: 'Nepali Food' },
    restaurantId: { _id: '1', name: 'Nepali Kitchen', location: 'Kathmandu' },
    type: 'Nepali',
    isAvailable: true
  },
  {
    _id: '2',
    name: 'Biryani',
    description: 'Fragrant Indian rice dish',
    price: 350,
    filepath: 'uploads/biryani.jpg',
    image: 'http://localhost:5050/uploads/biryani.jpg',
    categoryId: { _id: '2', name: 'Indian Food' },
    restaurantId: { _id: '2', name: 'Indian Spice', location: 'Kathmandu' },
    type: 'Indian',
    isAvailable: true
  }
];

const mockCart = {
  _id: 'cart1',
  userId: 'user1',
  items: [
    {
      productId: mockProducts[0],
      quantity: 2,
      price: 250
    }
  ],
  totalAmount: 500
};

const mockUser = {
  _id: 'user1',
  username: 'testuser',
  email: 'test@example.com',
  role: 'user'
};

export const handlers = [
  // Auth endpoints
  http.post('*/api/auth/login', () => {
    return HttpResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: mockUser,
        token: 'mock-jwt-token'
      }
    });
  }),

  http.post('*/api/auth/register', () => {
    return HttpResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        user: mockUser,
        token: 'mock-jwt-token'
      }
    });
  }),

  // Categories endpoints
  http.get('*/api/categories', () => {
    return HttpResponse.json({
      success: true,
      message: 'Categories fetched successfully',
      data: mockCategories
    });
  }),

  http.get('*/api/food/categories', () => {
    return HttpResponse.json({
      success: true,
      message: 'Categories fetched successfully',
      data: mockCategories
    });
  }),

  // Products endpoints
  http.get('*/api/products', () => {
    return HttpResponse.json({
      success: true,
      message: 'Products fetched successfully',
      data: mockProducts
    });
  }),

  http.get('*/api/food/products', () => {
    return HttpResponse.json({
      success: true,
      message: 'Products fetched successfully',
      data: mockProducts
    });
  }),

  // Cart endpoints
  http.get('*/api/cart', () => {
    return HttpResponse.json({
      success: true,
      message: 'Cart fetched successfully',
      data: mockCart
    });
  }),

  http.post('*/api/cart/add', () => {
    return HttpResponse.json({
      success: true,
      message: 'Item added to cart successfully',
      data: mockCart
    });
  }),

  http.put('*/api/cart/update', () => {
    return HttpResponse.json({
      success: true,
      message: 'Cart updated successfully',
      data: mockCart
    });
  }),

  http.delete('*/api/cart/remove/:productId', () => {
    return HttpResponse.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: mockCart
    });
  }),

  // Orders endpoints
  http.get('*/api/orders', () => {
    return HttpResponse.json({
      success: true,
      message: 'Orders fetched successfully',
      data: []
    });
  }),

  http.post('*/api/orders', () => {
    return HttpResponse.json({
      success: true,
      message: 'Order created successfully',
      data: {
        _id: 'order1',
        userId: 'user1',
        items: mockCart.items,
        totalAmount: 500,
        orderStatus: 'pending',
        paymentStatus: 'pending'
      }
    });
  }),

  // Restaurants endpoints
  http.get('*/api/restaurants', () => {
    return HttpResponse.json({
      success: true,
      message: 'Restaurants fetched successfully',
      data: [
        {
          _id: '1',
          name: 'Nepali Kitchen',
          location: 'Kathmandu',
          contact: '+977-1-123456',
          filepath: 'uploads/restaurant1.jpg',
          image: 'http://localhost:5050/uploads/restaurant1.jpg'
        }
      ]
    });
  }),

  // Fallback handler
  http.all('*', ({ request }) => {
    console.warn(`Unhandled request: ${request.method} ${request.url}`);
    return HttpResponse.json(
      { success: false, message: 'Endpoint not found' },
      { status: 404 }
    );
  }),
]; 
