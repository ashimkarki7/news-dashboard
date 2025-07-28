import { configureStore } from '@reduxjs/toolkit';
import newsSlice from '@pages/HomePage/slice/slice.ts';

export const store = configureStore({
  reducer: {
newsData: newsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
