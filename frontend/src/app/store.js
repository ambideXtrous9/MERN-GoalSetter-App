import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice'

// will add user reducer and goal reducer
export const store = configureStore({
  reducer: {
    // open redux dev tools in browser, then go to state, 
    // this auth will appear
    auth : authReducer,
    goals : goalReducer 
  },
});
