import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Base URL for your API
    withCredentials: true, // Include credentials in requests
})