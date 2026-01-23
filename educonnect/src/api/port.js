import axios from "axios";
import useRefreshToken from '../hooks/useRefreshToken';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosTest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

const apiAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

// Attach interceptor (simplified example)
let refreshTokenPromise = null;

apiAxios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Use your refresh hook
                const newToken = await refresh(); // Call your refresh function
                
                // Update the failed request with new token
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                
                // Retry the original request
                return apiAxios(originalRequest);
            } catch (refreshError) {
                // Refresh failed - redirect to login
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api