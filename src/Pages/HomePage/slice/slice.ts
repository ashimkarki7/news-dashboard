import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v2Fetch } from '@/Utility/httpUtil.ts';
import type {NewsOverviewResponse, NewsQueryParams, NewsResponse, NewsState} from '../types/new.ts';

const initialState: NewsState = {
  articles: [],
  overview: null,
  overViewLoading: true,
  error: '',
  loading: true,
  totalResults:0
};

export const getOverView = createAsyncThunk<NewsOverviewResponse, void, { rejectValue: string }>(
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


export const getNews = createAsyncThunk<NewsResponse, NewsQueryParams | undefined, { rejectValue: string }>(
    'newsSlice/fetch',
    async (formData, { rejectWithValue }) => {
      try {
        const queryParts: string[] = [];

        if (formData && typeof formData === 'object') {
          Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
          });
        }

        if (!formData?.q) {
          queryParts.push(`q=*`);
        }

        const queryString = queryParts.length ? `?${queryParts.join('&')}` : '?q=*';

        const response = await v2Fetch(`/everything${queryString}`);

        if (response.status === 200) {
          return Promise.resolve(response.data);
        }

        return rejectWithValue('Unexpected error');
      } catch (error: any) {
        try {
          const parsed = JSON.parse(error);
          return rejectWithValue(parsed?.message || 'Failed to fetch news');
        } catch {
          return rejectWithValue('Error fetching news');
        }
      }
    }
);

export const getNewsPaginated = createAsyncThunk<NewsResponse, NewsQueryParams | undefined, { rejectValue: string }>(
    'newsPaginationSlice/fetch',
    async (formData, { rejectWithValue }) => {
      try {
        const queryParts: string[] = [];

        if (formData && typeof formData === 'object') {
          Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
          });
        }

        if (!formData?.q) {
          queryParts.push(`q=*`);
        }

        const queryString = queryParts.length ? `?${queryParts.join('&')}` : '?q=*';

        const response = await v2Fetch(`/everything${queryString}`);

        if (response.status === 200) {
          return Promise.resolve(response.data);
        }

        return rejectWithValue('Unexpected error');
      } catch (error: any) {
        try {
          const parsed = JSON.parse(error);
          return rejectWithValue(parsed?.message || 'Failed to fetch news');
        } catch {
          return rejectWithValue('Error fetching news');
        }
      }
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
      state.totalResults = 0;
    });

    builder.addCase(getNews.fulfilled, (state, action: PayloadAction<NewsResponse>) => {
      const { articles, totalResults } = action.payload;
      state.loading = false;
      state.articles =  articles;
      state.totalResults = totalResults;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
      state.articles = [];
      state.error = action.payload?.toString();
      state.totalResults = 0;
    });
    builder.addCase(getNewsPaginated.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(getNewsPaginated.fulfilled, (state, action: PayloadAction<NewsResponse>) => {
      const { articles, totalResults } = action.payload;
      state.loading = false;
      state.articles = [...state.articles, ...articles];
      state.totalResults = totalResults;
    });
    builder.addCase(getNewsPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.toString();
    });
    builder.addCase(getOverView.pending, (state) => {
      state.overViewLoading = true;
      state.error = '';
      state.overview  = null;
    });

    builder.addCase(getOverView.fulfilled, (state,  action: PayloadAction<NewsOverviewResponse>) => {
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
