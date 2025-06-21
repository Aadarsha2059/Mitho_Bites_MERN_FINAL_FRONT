import axios from "./api"

export const registerUserApi=(data) =>axios.post("/auth/register",data)

export const loginUserApi=(data) =>axios.post("/auth/login",data)

export const forgotPasswordApi=(data) =>axios.post("/auth/forgot-password",data)

export const resetPasswordApi=(token, data) =>axios.post(`/auth/reset-password/${token}`,data)



