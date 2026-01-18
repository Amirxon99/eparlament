import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

let isRefreshing = false;
let subscribers = [];

function onRefreshed(token) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token found");

          const { data } = await axios.post(`${BASE_URL}/auth/refreshtoken`, {
            refreshToken,
          });

          console.log("🔁 REFRESH RESPONSE:", data);

          const { tokenBody, refreshToken: newRefresh } = data;

          if (tokenBody) {
            localStorage.setItem("accessToken", tokenBody);
          } else {
            console.warn("⚠️ tokenBody kelmadi");
          }

          if (newRefresh) {
            localStorage.setItem("refreshToken", newRefresh);
          }

          axiosInstance.defaults.headers.common.Authorization = `Bearer ${tokenBody}`;
          onRefreshed(tokenBody);
          isRefreshing = false;
          originalRequest.headers.Authorization = `Bearer ${tokenBody}`;

          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("❌ REFRESH TOKEN FAILED:", err);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
