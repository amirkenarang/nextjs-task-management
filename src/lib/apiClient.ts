import axios from "axios";
import { toast } from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  // const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        toast.error("Session expired. Redirecting to login...");
        if (typeof window !== "undefined") {
          setTimeout(() => {
            localStorage.removeItem("token");
            window.location.href = "/pages/auth/login";
          }, 1500); // Wait a moment for user to see the toast
        }
      } else if (status >= 400 && status < 500) {
        toast.error(error.response.data?.message || "Client error");
      } else if (status >= 500) {
        toast.error("Server error. Please try again later.");
      }
    } else {
      toast.error("Network error or server is unreachable.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
