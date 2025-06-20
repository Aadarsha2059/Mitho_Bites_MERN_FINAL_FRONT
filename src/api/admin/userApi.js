import axios from "../api";

// Get all users with optional query params (pagination, search)
export const getAllUserApi = (params) => 
  axios.get("/admin/users", { params });

// Get one user by ID
export const getOneUserApi = (id) => 
  axios.get(`/admin/users/${id}`);

// Update one user by ID with form data
export const updateOneUserApi = (id, data) => 
  axios.put(`/admin/users/${id}`, data);

// Delete one user by ID
export const deleteOneUserApi = (id) => 
  axios.delete(`/admin/users/${id}`);
