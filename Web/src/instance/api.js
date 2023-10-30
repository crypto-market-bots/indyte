import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8080/api',
  baseURL: 'https://13.127.229.77/api',
  // baseURL: 'https://ec2-15-206-239-93.ap-south-1.compute.amazonaws.com/api',
});

// Function to get the bearer token from localStorage
const getBearerToken = () => {
  return localStorage.getItem('token');
};

// Add a request interceptor to include the bearer token in requests
api.interceptors.request.use(
  (config) => {
    const token = getBearerToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
