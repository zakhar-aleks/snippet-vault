import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default instance;