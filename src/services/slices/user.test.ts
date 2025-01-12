import { userReducer } from './user';
import { userResponse } from '../../../cypress/mocks/user';
import { initialState } from '../store.test';

test('register user', async () => {
  expect(
    userReducer(initialState.user, {
      type: 'user/register/fulfilled',
      payload: userResponse
    }).user
  ).toEqual(userResponse.user);

  let store = userReducer(initialState.user, {
    type: 'user/register/rejected',
    error: { message: 'wrong register' }
  });
  expect(store.error).toBe('wrong register');

  store = userReducer(initialState.user, {
    type: 'user/register/pending'
  });
  expect(store.error).toBe('');
});

test('login/logout user', async () => {
  let store = userReducer(initialState.user, {
    type: 'user/login/fulfilled',
    payload: userResponse
  });
  expect(store.isAuthed).toBeTruthy();
  expect(store.user).toEqual(userResponse.user);

  store = userReducer(store, {
    type: 'user/logout/fulfilled'
  });
  expect(store.isAuthed).toBeFalsy();
  expect(store.user.email).toBe('');

  store = userReducer(initialState.user, {
    type: 'user/login/rejected',
    error: { message: 'login error' }
  });
  expect(store.error).toBe('login error');

  store = userReducer(initialState.user, {
    type: 'user/login/pending'
  });
  expect(store.error).toBe('');
});

test('update user', async () => {
  let store = userReducer(initialState.user, {
    type: 'user/getuser/fulfilled',
    payload: userResponse
  });
  expect(store.isAuthed).toBeTruthy();
  expect(store.user).toEqual(userResponse.user);

  store = userReducer(initialState.user, {
    type: 'user/update/fulfilled',
    payload: {
      ...userResponse,
      user: { ...userResponse.user, email: 'newemail@mail.ru' }
    }
  });
  expect(store.user.email).toEqual('newemail@mail.ru');
});
