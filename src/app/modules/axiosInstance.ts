import axios from 'axios';
import dotenv from "dotenv"
dotenv.config()

const axiosInstance = axios.create({
  baseURL: process.env.DATABASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;