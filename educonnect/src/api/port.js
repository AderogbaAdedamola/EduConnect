import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  // withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosTest = axios.create({
    baseURL: import.meta.env.BASE_URL,
    withCredentials: true
});



// export const attachInterceptors = (getAccessToken, setAccessToken, clearAuth) => {
//   // Request Interceptor
//   api.interceptors.request.use(
//     (config) => {
//       const token = getAccessToken();
//       if (token) config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Response Interceptor
//   api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (!error.response) return Promise.reject(error);

//       const originalRequest = error.config;

//       // Handle 401 → try refresh
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         try {
//           // FIXED: use POST instead of GET
//           const res = await api.post("/auth/refresh", {}, { withCredentials: true });

//           // Update token store and headers
//           const newToken = res.data.accessToken;
//           setAccessToken(newToken);
//           api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
//           originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

//           // Retry the original request
//           return api(originalRequest);
//         } catch (refreshError) {
//           clearAuth();
//           return Promise.reject(refreshError);
//         }
//       }

//       return Promise.reject(error);
//     }
//   );
// };

export default api;


// import axios from "axios"

// export const api = axios.create({
//     baseURL: "http://localhost:5500/api",
//     withCredentials: true, // send cookies automatically
// });


// export const attachInterceptors = (getAccessToken, setAccessToken, clearAuth) => {
//   // Request Interceptor
//   api.interceptors.request.use(
//     (config) => {
//       const token = getAccessToken();
//       if (token) config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Response Interceptor
//   api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       // Handle 401: Access token expired → try refresh
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const res = await api.get("/auth/refresh", { withCredentials: true });
//           setAccessToken(res.data.accessToken);
//           api.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
//           return api(originalRequest);
//         } catch (refreshError) {
//           // Refresh failed → clear memory and redirect to login
//           clearAuth()
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// export default api;
