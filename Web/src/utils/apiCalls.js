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

// export const fetchOrders = createApiThunk(
//   'fetch/orders',
//   () => api.get('/api/fetch-orders'),
//   'Orders Fetched ',
//   (response) => response.data.orders,
//   (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
// );

// export const refreshOrders = createApiThunk(
//   'refresh/orders',
//   () => api.get('/api/trigger-daftra-invoice-refresh'),
//   (response) => `${response.data.new_records_added} new values added`,
//   (response) => response.data.new_records_added,
//   (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
// );

// export const fetchUsers = createApiThunk(
//   'fetch/users',
//   () => api.get('/api/fetch-users'),
//   'users fetched successfully',
//   (response) => response.data.users,
//   (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
// );

// export const createUser = createApiThunk(
//   'create/users',
//   (requestData) => api.post('/api/register-user', requestData),
//   'users created successfully',
//   (response) => response.data.message,
//   (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
// );
