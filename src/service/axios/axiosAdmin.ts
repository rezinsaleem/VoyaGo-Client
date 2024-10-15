/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const axiosAdmin = () => {
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}/admin`,
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(
        (config: any) => {
            const token = localStorage.getItem('adminToken');
            return {
                ...config,
                headers: {
                    ...(token !== null && { Authorization: `Bearer ${token}` }),
                    ...config.headers,
                },
            };
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            console.log(response);
            return response;
        },
        (error) => {
            console.error('API Error:', error);
            return Promise.reject(error);
        }
    );

    return instance;
};
