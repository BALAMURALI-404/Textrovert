import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://textrovert-0xaq.onrender.com/api', // Base URL for your API
    withCredentials: true, // Include credentials in requests
})