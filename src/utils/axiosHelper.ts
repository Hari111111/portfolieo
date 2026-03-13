import axios from "axios";

const axiosHelper = axios.create({
    baseURL: "https://port-backend-three.vercel.app/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosHelper.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosHelper.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.data);
        } else {
            console.error("Network Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosHelper;