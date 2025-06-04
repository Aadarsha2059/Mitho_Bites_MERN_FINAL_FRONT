import axios from "./api"

export const registerUserApi=(data) =>axios.post("/auth/register",data)

