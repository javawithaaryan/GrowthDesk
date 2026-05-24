import api from "./api";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const registerUser = async (userData) => {

  const response = await api.post(
    "/api/auth/register",
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {

  const response = await api.post(
    "/api/auth/login",
    userData
  );

  return response.data;
};