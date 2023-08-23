import { combineReducers } from '@reduxjs/toolkit';
// import { slice } from './slice';
import sliceReducer from './slice';

const rootReducer = combineReducers({
  slice: sliceReducer,
});

export default rootReducer;
