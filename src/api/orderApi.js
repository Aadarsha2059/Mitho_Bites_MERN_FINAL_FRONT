import axios from "./api";

export const createOrderApi = (data) => axios.post("/orders", data);
export const getUserOrdersApi = (params) => axios.get("/orders", { params });
export const getOrderByIdApi = (id) => axios.get(`/orders/${id}`);
export const cancelOrderApi = (id) => axios.put(`/orders/${id}/cancel`);
export const updatePaymentStatusApi = (id, data) => axios.put(`/orders/${id}/payment`, data); 
