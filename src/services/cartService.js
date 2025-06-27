import { 
    testCartAuthApi,
    getCartApi, 
    addToCartApi, 
    updateCartItemApi, 
    removeFromCartApi, 
    clearCartApi 
} from "../api/cartApi";

export const testCartAuthService = async () => {
    try {
        console.log('=== TESTING CART AUTH ===');
        const response = await testCartAuthApi();
        console.log('Auth test response:', response.data);
        return response.data;
    } catch (err) {
        console.error('Auth test error:', err);
        throw err.response?.data || { message: "Auth test failed" };
    }
};

export const getCartService = async () => {
    try {
        const response = await getCartApi();
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to fetch cart" };
    }
};

export const addToCartService = async (data) => {
    try {
        console.log('=== CART SERVICE DEBUG ===');
        console.log('Sending data to backend:', data);
        console.log('Data type:', typeof data);
        console.log('Data keys:', Object.keys(data || {}));
        
        const response = await addToCartApi(data);
        
        console.log('Backend response:', response.data);
        
        return response.data;
    } catch (err) {
        console.error('Cart service error:', err);
        console.error('Error response:', err.response?.data);
        throw err.response?.data || { message: "Failed to add item to cart" };
    }
};

export const updateCartItemService = async (data) => {
    try {
        const response = await updateCartItemApi(data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to update cart item" };
    }
};

export const removeFromCartService = async (productId) => {
    try {
        const response = await removeFromCartApi(productId);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to remove item from cart" };
    }
};

export const clearCartService = async () => {
    try {
        const response = await clearCartApi();
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to clear cart" };
    }
}; 