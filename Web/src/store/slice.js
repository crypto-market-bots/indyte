// slice.js
import { createSlice } from '@reduxjs/toolkit';
import { login, fetchCustomer, fetchDietitian, getUserDetails } from '../utils/apiCalls';


const initialState = {
  success: {
    login: false,
  },
  data: {
    login: [],
    customers: [],
    dietitians: [],
    loggedInuserData: [],

  },
  loading: {
    refreshOrders: false,
    login: false,
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
      .addCase(fetchDietitian.fulfilled, (state, action) => {
        state.data.dietitians = action.payload;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.data.loggedInuserData = action.payload;

      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;

export default slice.reducer;
