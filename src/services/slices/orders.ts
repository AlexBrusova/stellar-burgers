import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const loadOrders = createAsyncThunk('orders/loadOrders', async () => {
  const response = await getOrdersApi();
  return response;
});
export const loadOrder = createAsyncThunk(
  'orders/loadOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

type TOrdersStore = {
  loading: boolean;
  creating: boolean;
  orders: TOrder[];
  created: TOrder | null;
};

export const ordersSlice = createSlice({
  name: 'feeds',
  initialState: {
    loading: false,
    creating: false,
    orders: [],
    created: null
  } as TOrdersStore,
  reducers: {
    resetOrder: (state) => {
      state.created = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
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
        state.created = action.payload.orders[0];
      })
      .addCase(createOrder.pending, (state) => {
        state.creating = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.creating = false;
        state.orders.push(action.payload.order);
      });
  }
});

export const { resetOrder } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
