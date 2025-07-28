import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v2Fetch } from '@/Utility/httpUtil.ts';
import type { NewsState } from '../types/new.ts';

const initialState: NewsState = {
  articles: [],
  overview: null,
  overViewLoading: true,
  error: '',
  loading: true,
};
export const getOverView = createAsyncThunk(
  'newsOverviewSlice/fetch',
  (_, { rejectWithValue }) => {
    return v2Fetch(`/top-headlines/sources`,{})
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


export const getNews = createAsyncThunk(
  'newsSlice/fetch',
  (_, { rejectWithValue }) => {
    return v2Fetch(`/everything
`,{q:'*'})
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
      state.articles = [];
      state.overview = null;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.loading = true;
      state.error = '';
      state.articles = [];
    });

    builder.addCase(getNews.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
      state.articles = [];
      state.error = action.payload?.toString();
    });
    builder.addCase(getOverView.pending, (state) => {
      state.overViewLoading = true;
      state.error = '';
      state.overview  = null;
    });

    builder.addCase(getOverView.fulfilled, (state, action) => {
      state.overViewLoading = false;
      state.overview = action.payload;
    });
    builder.addCase(getOverView.rejected, (state, action) => {
      state.overViewLoading = false;
      state.overview  = null;
      state.error = action.payload?.toString();
    });
  },
});

export const { cleanNewsData } = newsSlice.actions;
export default newsSlice.reducer;
