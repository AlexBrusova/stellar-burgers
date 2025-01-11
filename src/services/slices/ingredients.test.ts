import { ingredientsReducer } from './ingredients';
import { ingredientsResponse } from '../../../cypress/mocks/ingredients';
import { initialState } from '../store.test';

test('load ingredients', async () => {
  let store = ingredientsReducer(initialState.ingredients, {
    type: 'ingredients/loadIngredients/pending'
  });
  expect(store.loading).toBeTruthy();

  store = ingredientsReducer(store, {
    type: 'ingredients/loadIngredients/fulfilled',
    payload: ingredientsResponse.data
  });
  expect(store.loading).toBeFalsy();
  expect(store.ingredients).toHaveLength(ingredientsResponse.data.length);
});
