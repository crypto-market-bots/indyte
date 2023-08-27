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

export const addMeal = createApiThunk(
  'add/meal',
  (requestData) => api.post('/add-meal', requestData),
  'Meal Added successfully',
  (response) => response.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const fetchMeal = createApiThunk(
  'fetch/meal',
  (requestData) => api.get('/meals', requestData),
  'Meals fetched successfully',
  (response) => response.data.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const fetchSingleMealData = createApiThunk(
  'fetch/SingleMealData',
  (id) => api.get(`/meals/${id}`),
  'Meal fetched successfully',
  (response) => response.data.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const deleteMeal = createApiThunk(
  'delete/Meal',
  (id) => api.delete(`/delete-meal/${id}`),
  'Meal Deleted successfully',
  (response) => response.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const EditMeal = createApiThunk(
  'Edit/SingleMealData',
  (requestData) => {
    api.put(`/update-meal/${requestData.id}`, requestData);
  },
  'Meal Edited successfully',
  (response) => response.data,
  (error) => error?.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const fetchAllExercises = createApiThunk(
  'fetch/Exercise',
  (id) => api.get(`/exercises`),
  'Exercises Fetched Successfully',
  (response) => response.data.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);
export const fetchSingleExercise = createApiThunk(
  'fetch/singleExercise',
  (id) => api.get(`/exercises/${id}`),
  'Exercise Fetched Successfully',
  (response) => response.data?.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const EditExercise = createApiThunk(
  'Edit/SingleMealData',
  (requestData) => {
    api.put(`/update-exercise/${requestData.id}`, requestData);
  },
  'Exercise Edited successfully',
  (response) => response.data,
  (error) => error?.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const addExercise = createApiThunk(
  'add/exercise',
  (requestData) => api.post('/add-exercise', requestData),
  'Exercise Added successfully',
  (response) => response.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const deleteExercise = createApiThunk(
  'delete/Exercise',
  (id) => api.delete(`/delete-exercise/${id}`),
  'Exercises Deleted Successfully',
  (response) => response.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const fetchWorkouts = createApiThunk(
  'fetch/workouts',
  () => api.get(`/workout`),
  'Workouts fetched Successfully',
  (response) => response.data.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const fetchSingleWorkout = createApiThunk(
  'fetch/singleWorkouts',
  (id) => api.get(`/workout/${id}`),
  'Workout fetched Successfully',
  (response) => response.data.message,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);

export const deleteWorkout = createApiThunk(
  'delete/workouts',
  (id) => api.delete(`/delete-workout/${id}`),
  'Workouts deleted Successfully',
  (response) => response.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);
export const EditWorkout = createApiThunk(
  'edit/workouts',
  (requestData) => {
    api.put(`/update-workout/${requestData.id}`, requestData);
  },
  'Workouts Edited Successfully',
  (response) => response.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);
export const addWorkout = createApiThunk(
  'add/workout',
  (requestData) => api.post('/create-workout', requestData),
  'Workout Added successfully',
  (response) => response.data,
  (error) => error.response?.data?.message ?? error.message ?? 'An error occurred.'
);
