import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '..';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

type TIngredientsStore = {
  loading: boolean;
  ingredients: TIngredient[];
};

const select = (state: RootState) => state.ingredients.ingredients;
export const selectIngredients = createSelector([select], (ingredients) => ({
  buns: ingredients.filter((i) => i.type === 'bun'),
  sauces: ingredients.filter((i) => i.type === 'sauce'),
  mains: ingredients.filter((i) => i.type === 'main')
}));

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    loading: false,
    ingredients: []
  } as TIngredientsStore,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
