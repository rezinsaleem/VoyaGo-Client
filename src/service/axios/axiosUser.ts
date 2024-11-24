import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "../redux/store";
import { userLogout } from "../redux/slices/userAuthSlice";

const createAxios = (): AxiosInstance => {
    const axiosUser: AxiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}/user`,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Request Interceptor: Attach user token to headers if it exists
    axiosUser.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem('userToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Helper function to clear auth data and redirect to sign-in
    const clearAuthDataAndRedirect = () => {
        localStorage.clear();
        store.dispatch(userLogout());
        window.location.href = '/signin';
    };

    // Response Interceptor: Refresh token on 401 error, logout if refresh fails
    axiosUser.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            // Only retry once if 401 Unauthorized
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    clearAuthDataAndRedirect();
                    return Promise.reject(error);
                }

                try {
                    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
                        token: refreshToken,
                    });
                    const newAccessToken = data.accessToken;
                    const newRefreshToken = data.refreshToken;

                    // Update tokens in local storage
                    localStorage.setItem('userToken', newAccessToken);
                    if (newRefreshToken) {
                        localStorage.setItem('refreshToken', newRefreshToken);
                    }

                    // Attach new access token to headers and retry the original request
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    axiosUser.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    
                    // Retry the failed request with the new access token
                    return axiosUser(originalRequest);
                } catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError);
                    clearAuthDataAndRedirect();
                    return Promise.reject(refreshError);
                }
            }

            // Reject other errors that aren’t handled
            return Promise.reject(error);
        }
    );

    return axiosUser;
}

export default createAxios;
