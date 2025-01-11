import { feedsReducer } from './feeds';
import { orderResponse, ordersResponse } from '../../../cypress/mocks/order';
import { initialState } from '../store.test';

test('load feeds', async () => {
  let store = feedsReducer(initialState.feeds, {
    type: 'feeds/loadFeeds/pending'
  });
  expect(store.loading).toBeTruthy();

  store = feedsReducer(store, {
    type: 'feeds/loadFeeds/fulfilled',
    payload: ordersResponse
  });
  expect(store.loading).toBeFalsy();
  expect(store.total).toBe(ordersResponse.total);
  expect(store.totalToday).toBe(ordersResponse.totalToday);
  expect(store.orders).toHaveLength(ordersResponse.orders.length);
});

test('update feeds by load order', async () => {
  let store = feedsReducer(initialState.feeds, {
    type: 'orders/loadOrder/pending'
  });
  expect(store.loading).toBeTruthy();

  store = feedsReducer(store, {
    type: 'orders/loadOrder/fulfilled',
    payload: { orders: [orderResponse.order] }
  });
  expect(store.loading).toBeFalsy();
  expect(store.orders).toHaveLength(1);
});
