// src/hooks/useAxiosSecure.js
import { useMemo } from "react";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const useAxiosSecure = () => {
  return useMemo(() => axiosSecure, []);
};

export default useAxiosSecure;