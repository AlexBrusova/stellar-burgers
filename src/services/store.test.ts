import { rootReducer } from './';

export const initialState = {
  burgerConstructor: {
    ingredientsIds: []
  },
  feeds: {
    loading: false,
    orders: [],
    total: 0,
    totalToday: 0
  },
  ingredients: {
    ingredients: [],
    loading: false
  },
  orders: {
    created: null,
    creating: false,
    loading: false,
    orders: []
  },
  user: {
    error: '',
    isAuthed: false,
    user: {
      email: '',
      name: ''
    }
  }
};

test('initialize root reducer', () => {
  expect(rootReducer({}, { type: 'unknown' })).toStrictEqual(initialState);
});
