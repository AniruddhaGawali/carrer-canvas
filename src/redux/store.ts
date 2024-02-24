import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from '@/redux/features/resumeSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
