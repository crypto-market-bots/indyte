import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
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
