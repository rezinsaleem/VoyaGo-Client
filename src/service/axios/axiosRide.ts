import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "../redux/store";
import { userLogout } from "../redux/slices/userAuthSlice";

const createAxios = (): AxiosInstance => {
    const axiosRide: AxiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}/ride`,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Request Interceptor: Attach user token to headers if it exists
    axiosRide.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem('userToken');
            if (token) {
                config.headers.set('Authorization', `Bearer ${token}`);
            }
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Response Interceptor: Refresh token on 401 error, logout if refresh fails
    axiosRide.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
          console.error('AxiosError:', error); // Log the full error for better insight
  
          const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
  
          if (error.response?.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
              const refreshToken = localStorage.getItem('refreshToken');
  
              if (!refreshToken) {
                  localStorage.clear();  
                  store.dispatch(userLogout());
                  window.location.href = '/signin';
                  return Promise.reject(error);
              }
  
              try {
                  const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
                      token: refreshToken,
                  });
                  const newAccessToken = data.accessToken;
                  const newRefreshToken = data.refreshToken;
  
                  localStorage.setItem('userToken', newAccessToken);
                  if (newRefreshToken) {
                      localStorage.setItem('refreshToken', newRefreshToken);
                  }
  
                  originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                  axiosRide.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
  
                  return axiosRide(originalRequest);
              } catch (refreshError) {
                  console.error('Failed to refresh token:', refreshError);
                  localStorage.clear();
                  store.dispatch(userLogout());
                  window.location.href = '/signin';
                  return Promise.reject(refreshError);
              }
          }
  
          return Promise.reject(error);
      }
  );
    return axiosRide;
}

export default createAxios;
