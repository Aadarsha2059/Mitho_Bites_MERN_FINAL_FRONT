import axios from "./api";

export const getCartApi = () => axios.get("/cart");
export const addToCartApi = (data) => axios.post("/cart/add", data);
export const updateCartItemApi = (data) => axios.put("/cart/update", data);
export const removeFromCartApi = (productId) => axios.delete(`/cart/remove/${productId}`);
export const clearCartApi = () => axios.delete("/cart/clear"); 