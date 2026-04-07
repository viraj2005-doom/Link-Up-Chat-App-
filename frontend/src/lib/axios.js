import axios from "axios";
import { getAccessToken } from "./auth";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
});

axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
        delete config.headers.Authorization;
    }

    return config;
});
