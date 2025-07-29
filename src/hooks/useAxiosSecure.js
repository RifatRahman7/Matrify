// import { useMemo } from "react";
// import axios from "axios";

// const axiosSecure = axios.create({
//   baseURL:
//     process.env.NODE_ENV === "production"
//       ? "https://matrify-server.vercel.app/"
// });

// axiosSecure.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access-token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// const useAxiosSecure = () => useMemo(() => axiosSecure, []);

// export default useAxiosSecure;