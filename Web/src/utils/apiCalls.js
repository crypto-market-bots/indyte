import api from '../instance/api';
import { createApiThunk } from '../store/createApiThunk';

// ---> API INITIALIZATION SEQUENCE
// NAME
// APICALL
// SUCCESS MESSAGE : STRING | FUNCTION
// SUCCESS RESPONSE
// ERROR MESSAGE

export const login = createApiThunk(
  'login/login',
  (requestData) => api.post('/login', requestData),
  'Login Successful',
  (response) => response.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const fetchCustomer = createApiThunk(
  'fetch/customers',
  () => api.get('/fetch-user?type=user'),
  'customers fetched successfully',
  (response) => response.data.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const fetchDietitian = createApiThunk(
  'fetch/dietitians',
  () => api.get('/fetch-user?type=dietitian'),
  'dietitians fetched successfully',
  (response) => response.data.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const getUserDetails = createApiThunk(
  'get/user',
  () => api.get('/get-user-detail'),
  null,
  (response) => response.data.user,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const addDietitian = createApiThunk(
  'get/user',
  () => api.post('/add-dietitian'),
  'Dietitian Added successfully',
  (response) => response.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);
