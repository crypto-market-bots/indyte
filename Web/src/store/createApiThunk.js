import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';

// Utility function to handle API calls and notifications
export const createApiThunk = (name, apiCall, successMessage, transformResponse, transformErrorMessage) =>
  createAsyncThunk(name, async (requestData) => {
    try {
      // call the api with requested data

      const response = await apiCall(requestData);

      // show success message

      if (successMessage) {
        showSuccessNotification(
          typeof successMessage === 'function'
            ? successMessage(response) // Call the callback function if it's provided
            : successMessage
        );
      }
      if (response) return transformResponse(response);
    } catch (error) {
      const errorMessage = transformErrorMessage(error);
      //   show error message
      showErrorNotification(errorMessage);
      //   return the error response
      return transformResponse(error.response);
    }
  });

const showSuccessNotification = (message) => {
  notification.success({
    message,
    placement: 'bottomRight',
  });
};

const showErrorNotification = (message) => {
  notification.error({
    message,
    placement: 'bottomRight',
  });
};
