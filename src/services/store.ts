import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  burgerConstructorReducer,
  feedsReducer,
  ingredientsReducer,
  ordersReducer,
  userReducer
} from '@slices';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    feeds: feedsReducer,
    orders: ordersReducer,
    burgerConstructor: burgerConstructorReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
