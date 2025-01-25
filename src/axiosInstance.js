import axios from 'axios';

const ApiUrl = import.meta.env.VITE_APP_DEV_API_URL || 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: ApiUrl,
//   timeout: 5000, // Optional: Timeout for requests
});

export default axiosInstance;