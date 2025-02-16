import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { jwtDecode } from "jwt-decode";
import { store } from "../redux/store";
import { userLogout } from "../redux/slices/userAuthSlice";


interface DecodedToken {
  exp?: number;
  id: string;
  role: string;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp !== undefined
      ? decodedToken.exp < currentTime
      : true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Default to expired on error
  }
};

const createAxios = (): AxiosInstance => {
  const axiosChat: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/chat`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosChat.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        if (!isTokenExpired(token)) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } else {
        config.headers["Authorization"] = ""; 
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axiosChat.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("refreshToken");
          store.dispatch(userLogout());
          window.location.href = "/signin";
          return Promise.reject(error);
        }

        try {
          const {data} = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
            { token: refreshToken }
          );
          console.log("asdsd" + data.access_token , data.refresh_token);
          const newAccessToken = data.access_token;
          const newRefreshToken = data.refresh_token;

          localStorage.setItem("userToken", newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          axiosChat.defaults.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          return axiosChat(originalRequest);
        } catch (error) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("refreshToken");
          store.dispatch(userLogout());
          window.location.href = "/signin";
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosChat;
};

export default createAxios;
