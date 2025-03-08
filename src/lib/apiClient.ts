import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Replace with your Go API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include the auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default apiClient;
