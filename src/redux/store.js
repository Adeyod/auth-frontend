import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const globalStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default globalStore;
