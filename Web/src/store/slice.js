// slice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  fetchCustomer,
  fetchDietitian,
  getUserDetails,
  fetchMeal,
  fetchSingleMealData,
  EditMeal,
  fetchAllExercises,
  fetchWorkouts,
  fetchSingleExercise,
  fetchSingleWorkout,
  fetchCustomerDetails,
  fetchDietitianDetails,
} from '../utils/apiCalls';

const initialState = {
  success: {
    login: false,
  },
  data: {
    login: [],
    customers: [],
    customerDetails: [],
    dietitians: [],
    dietitiansDetails: [],
    loggedInuserData: [],
    meals: [],
    singlemeal: [],
    exercises: [],
    singleExercise: [],
    workouts: [],
    singleWorkout: [],
  },
  loading: {
    refreshOrders: false,
    login: false,
    singlemeal: false,
    singleExercise: false,
    singleWorkout: false,
  },
};

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(login.pending, (state, action) => {
        state.loading.login = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data.login = action.payload;
        state.loading.login = false;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.data.customers = action.payload;
      })
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.data.customerDetails = action.payload;
      })
      .addCase(fetchDietitian.fulfilled, (state, action) => {
        state.data.dietitians = action.payload;
      })
      .addCase(fetchDietitianDetails.fulfilled, (state, action) => {
        state.data.dietitiansDetails = action.payload;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.data.loggedInuserData = action.payload;
      })
      .addCase(fetchMeal.fulfilled, (state, action) => {
        state.data.meals = action.payload;
      })
      .addCase(fetchSingleMealData.pending, (state, action) => {
        state.loading.singlemeal = true;
      })
      .addCase(fetchSingleMealData.fulfilled, (state, action) => {
        state.loading.singlemeal = false;
        state.data.singlemeal = action.payload;
      })
      .addCase(fetchAllExercises.fulfilled, (state, action) => {
        state.data.exercises = action.payload;
      })
      .addCase(fetchSingleExercise.pending, (state, action) => {
        state.loading.singleExercise = true;
      })
      .addCase(fetchSingleExercise.fulfilled, (state, action) => {
        state.loading.singleExercise = false;
        state.data.singleExercise = action.payload;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.data.workouts = action.payload;
      })
      .addCase(fetchSingleWorkout.pending, (state, action) => {
        state.loading.singleWorkout = true;
      })
      .addCase(fetchSingleWorkout.fulfilled, (state, action) => {
        state.loading.singleWorkout = false;
        state.data.singleWorkout = action.payload;
      });
  },
});

export const {} = slice.actions;

export default slice.reducer;
