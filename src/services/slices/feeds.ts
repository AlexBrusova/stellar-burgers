import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { loadOrder } from './orders';

export const loadFeeds = createAsyncThunk('feeds/loadFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

type TFeedsStore = {
  loading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState: {
    loading: false,
    total: 0,
    totalToday: 0,
    orders: []
  } as TFeedsStore,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFeeds.fulfilled, (state, action) => {
        state.totalToday = action.payload.totalToday;
        state.total = action.payload.total;
        state.orders = action.payload.orders;
        state.loading = false;
      })
      .addCase(loadOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((o) =>
          o.number === action.payload.orders[0].number
            ? action.payload.orders[0]
            : o
        );
      });
  }
});

export const feedsReducer = feedsSlice.reducer;
