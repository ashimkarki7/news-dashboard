import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v2Fetch } from '@/Utility/httpUtil.ts';
import type { NewsState } from '../types/new.ts';

const initialState: NewsState = {
  payload: [],
  error: '',
  loading: true,
};
export const getNews = createAsyncThunk(
  'newsSlice/fetch',
  (_, { rejectWithValue }) => {
    return v2Fetch(`/api/news`)
      .then((response: any) => {
        if (response.status === 200) {
          return Promise.resolve(response?.data);
        }
      })
      .catch((error: any) => {
        const errorThrown = JSON.parse(error);
        return rejectWithValue(errorThrown?.message);
      });
  }
);

const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    cleanNewsData(state) {
      state.loading = false;
      state.payload = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.loading = true;
      state.error = '';
      state.payload = [];
    });

    builder.addCase(getNews.fulfilled, (state, action) => {
      state.loading = false;
      state.payload = action.payload;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
      state.payload = [];
      state.error = action.payload?.toString();
    });
  },
});

export const { cleanNewsData } = newsSlice.actions;
export default newsSlice.reducer;
