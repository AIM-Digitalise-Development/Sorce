import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Updated to live backend URL
});

// Request Interceptor: Add `Authorization` header
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // Ensure correct key
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false; // Prevent infinite loop

// Response Interceptor: Auto-refresh token on 401 (Unauthorized)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          const { data } = await axios.post("http://localhost:5000/api/admin/refresh-token", {
            refreshToken,
          });

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          isRefreshing = false;
          return API.request(error.config);
        }
      } catch (refreshError) {
        console.error("Refresh token expired:", refreshError);
        localStorage.clear();
        window.location.href = "/login"; // Redirect to login if refresh fails
      }
    }
    isRefreshing = false;
    return Promise.reject(error);
  }
);

export default API;
