import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default instance;