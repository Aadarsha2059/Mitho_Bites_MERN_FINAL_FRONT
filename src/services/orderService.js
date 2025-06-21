import { 
    createOrderApi, 
    getUserOrdersApi, 
    getOrderByIdApi, 
    cancelOrderApi, 
    updatePaymentStatusApi 
} from "../api/orderApi";

export const createOrderService = async (data) => {
    try {
        const response = await createOrderApi(data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to create order" };
    }
};

export const getUserOrdersService = async (params) => {
    try {
        const response = await getUserOrdersApi(params);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to fetch orders" };
    }
};

export const getOrderByIdService = async (id) => {
    try {
        const response = await getOrderByIdApi(id);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to fetch order" };
    }
};

export const cancelOrderService = async (id) => {
    try {
        const response = await cancelOrderApi(id);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to cancel order" };
    }
};

export const updatePaymentStatusService = async (id, data) => {
    try {
        const response = await updatePaymentStatusApi(id, data);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Failed to update payment status" };
    }
}; 