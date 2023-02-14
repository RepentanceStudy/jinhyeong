import axios from 'axios';

const axiosInstance = axios.create({
   //  baseURL: import.meta.env.BASE_URL || '',
   baseURL: 'http://localhost:8080',
   headers: { 'Content-Type': 'application/json' },
});
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
   if (!config.headers) return config;

   return config;
});

axiosInstance.interceptors.response.use(
   response => response,
   error => Promise.reject((error.response && error.response.data) || ''),
);

export default axiosInstance;
