import { 
    getCartApi, 
    addToCartApi, 
    updateCartItemApi, 
    removeFromCartApi, 
    clearCartApi 
} from "../api/cartApi";

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
        const response = await addToCartApi(data);
        return response.data;
    } catch (err) {
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