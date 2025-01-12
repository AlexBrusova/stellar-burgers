import {
  addBun,
  addIngredient,
  burgerConstructorReducer,
  changeIngredients,
  removeIngredient
} from './burgerConstructor';
import { ingredientsResponse } from '../../../cypress/mocks/ingredients';
import { initialState } from '../store.test';

test('adding bun in burger constructor', () => {
  expect(
    burgerConstructorReducer(
      initialState.burgerConstructor,
      addBun(ingredientsResponse.data[0])
    )
  ).toEqual({
    ...initialState.burgerConstructor,
    bunId: ingredientsResponse.data[0]._id
  });
});

test('adding ingredients in burger constructor', () => {
  const storeWithAddedIngredient = burgerConstructorReducer(
    initialState.burgerConstructor,
    addIngredient(ingredientsResponse.data[1])
  );
  const regexp = new RegExp(`${ingredientsResponse.data[1]._id}_*`);
  expect(storeWithAddedIngredient.ingredientsIds[0]).toMatch(regexp);
});

test('removing ingredients in burger constructor', () => {
  let storeWithAddedIngredient = burgerConstructorReducer(
    initialState.burgerConstructor,
    addIngredient(ingredientsResponse.data[1])
  );
  const regexp = new RegExp(`${ingredientsResponse.data[1]._id}_*`);
  expect(storeWithAddedIngredient.ingredientsIds[0]).toMatch(regexp);
  storeWithAddedIngredient = burgerConstructorReducer(
    storeWithAddedIngredient,
    removeIngredient(storeWithAddedIngredient.ingredientsIds[0])
  );
  expect(storeWithAddedIngredient.ingredientsIds).toHaveLength(0);
});

test('change order of ingredients in burger constructor', () => {
  let storeWithAddedIngredient = burgerConstructorReducer(
    initialState.burgerConstructor,
    addIngredient(ingredientsResponse.data[1])
  );
  storeWithAddedIngredient = burgerConstructorReducer(
    storeWithAddedIngredient,
    addIngredient(ingredientsResponse.data[2])
  );
  const regexpIng1 = new RegExp(`${ingredientsResponse.data[1]._id}_*`);
  const regexpIng2 = new RegExp(`${ingredientsResponse.data[2]._id}_*`);
  expect(storeWithAddedIngredient.ingredientsIds[0]).toMatch(regexpIng1);
  expect(storeWithAddedIngredient.ingredientsIds[1]).toMatch(regexpIng2);
  storeWithAddedIngredient = burgerConstructorReducer(
    storeWithAddedIngredient,
    changeIngredients({
      id: storeWithAddedIngredient.ingredientsIds[0],
      dir: 1
    })
  );
  expect(storeWithAddedIngredient.ingredientsIds[0]).toMatch(regexpIng2);
  expect(storeWithAddedIngredient.ingredientsIds[1]).toMatch(regexpIng1);
});

test('reset burger constructor after fulfiled createOrder', () => {
  let storeWithAddedIngredient = burgerConstructorReducer(
    initialState.burgerConstructor,
    addIngredient(ingredientsResponse.data[1])
  );
  storeWithAddedIngredient = burgerConstructorReducer(
    storeWithAddedIngredient,
    addIngredient(ingredientsResponse.data[2])
  );
  storeWithAddedIngredient = burgerConstructorReducer(
    storeWithAddedIngredient,
    addBun(ingredientsResponse.data[0])
  );
  expect(storeWithAddedIngredient.bunId).toBe(ingredientsResponse.data[0]._id);
  expect(storeWithAddedIngredient.ingredientsIds).toHaveLength(2);
  storeWithAddedIngredient = burgerConstructorReducer(
    storeWithAddedIngredient,
    { type: 'orders/createOrder/fulfilled' }
  );
  expect(storeWithAddedIngredient.bunId).toBeUndefined();
  expect(storeWithAddedIngredient.ingredientsIds).toHaveLength(0);
});
