import axios from 'axios';

// Create an instance of Axios with a base URL
const api = axios.create({
  baseURL: 'https://ec2-15-206-239-93.ap-south-1.compute.amazonaws.com/api', // Replace with your base URL
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify config if needed, such as adding headers or authentication tokens
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Modify response data if needed
    return response;
  },
  (error) => {
    // Handle error responses globally
    return Promise.reject(error);
  }
);

export default api;
