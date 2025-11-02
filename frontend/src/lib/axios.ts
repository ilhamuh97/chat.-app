import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_V1 || "http://localhost:5001/api/v1",
    withCredentials: true, // include cookies in requests
});