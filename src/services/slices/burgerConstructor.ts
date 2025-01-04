import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgerConstructorStore = {
  bunId?: string;
  ingredientsIds: string[];
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    ingredientsIds: []
  } as TBurgerConstructorStore,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bunId = action.payload._id;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<string>) => {
        state.ingredientsIds.push(action.payload);
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: `${item._id}_${id}` };
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredientsIds = state.ingredientsIds.filter(
        (id) => id !== action.payload
      );
    },
    changeIngredients(
      state,
      action: PayloadAction<{ id: string; dir: 1 | -1 }>
    ) {
      const trgIndex = state.ingredientsIds.findIndex(
        (id) => id === action.payload.id
      );
      state.ingredientsIds[trgIndex] =
        state.ingredientsIds[trgIndex + action.payload.dir];
      state.ingredientsIds[trgIndex + action.payload.dir] = action.payload.id;
    }
  }
});

export const { addBun, addIngredient, removeIngredient, changeIngredients } =
  burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
