import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getCartService, 
    addToCartService, 
    updateCartItemService, 
    removeFromCartService, 
    clearCartService 
} from "../services/cartService";
import { toast } from "react-toastify";

export const useCart = () => {
    const queryClient = useQueryClient();

    const {
        data: cartData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["cart"],
        queryFn: getCartService,
        retry: 1
    });

    const cart = cartData?.data || { items: [], totalAmount: 0 };
    const itemCount = cart.items?.length || 0;

    const addToCartMutation = useMutation({
        mutationFn: addToCartService,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
            toast.success("Item added to cart!");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to add item to cart");
        }
    });

    const updateCartItemMutation = useMutation({
        mutationFn: updateCartItemService,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
            toast.success("Cart updated!");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to update cart");
        }
    });

    const removeFromCartMutation = useMutation({
        mutationFn: removeFromCartService,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
            toast.success("Item removed from cart!");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to remove item from cart");
        }
    });

    const clearCartMutation = useMutation({
        mutationFn: clearCartService,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
            toast.success("Cart cleared!");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to clear cart");
        }
    });

    const addToCart = (productId, quantity = 1) => {
        addToCartMutation.mutate({ productId, quantity });
    };

    const updateCartItem = (productId, quantity) => {
        updateCartItemMutation.mutate({ productId, quantity });
    };

    const removeFromCart = (productId) => {
        removeFromCartMutation.mutate(productId);
    };

    const clearCart = () => {
        clearCartMutation.mutate();
    };

    return {
        cart,
        itemCount,
        isLoading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refetch,
        isAddingToCart: addToCartMutation.isLoading,
        isUpdatingCart: updateCartItemMutation.isLoading,
        isRemovingFromCart: removeFromCartMutation.isLoading,
        isClearingCart: clearCartMutation.isLoading
    };
}; 