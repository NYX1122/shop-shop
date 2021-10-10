import { configureStore } from '@reduxjs/toolkit';
import reducer from './GlobalSlice';

export const store = configureStore({
  reducer: {
    global: reducer,
  },
});