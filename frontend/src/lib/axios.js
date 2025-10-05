import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? "http://localhost:5000/api" : 'https://textrovert-0xaq.onrender.com/api', // Base URL for your API
    timeout: 30000,
    withCredentials: true, // Include credentials in requests
})