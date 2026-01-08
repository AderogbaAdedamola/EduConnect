import axios from "axios"
import { createBrowserHistory } from "history"

export const api = axios.create({
    baseURL: "http://localhost:5500/api",
    withCredentials: true, // send cookies automatically
});

// Attach interceptors dynamically after AuthContext loads
export const attachInterceptors = (getAccessToken, setAccessToken, clearAuth) => {
  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle 401: Access token expired → try refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await api.get("/auth/refresh", { withCredentials: true });
          setAccessToken(res.data.accessToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed → clear memory and redirect to login
          clearAuth();
          const currentPath = window.location.pathname + window.location.search;
          sessionStorage.setItem("redirectAfterLogin", currentPath);
          history.push("/login");
        }
      }
      return Promise.reject(error);
    }
  );
};

export default api;
