import { ordersReducer } from './orders';
import { orderResponse, ordersResponse } from '../../../cypress/mocks/order';
import { initialState } from '../store.test';

test('load orders', async () => {
  let store = ordersReducer(initialState.orders, {
    type: 'orders/loadOrders/pending'
  });
  expect(store.loading).toBeTruthy();

  store = ordersReducer(store, {
    type: 'orders/loadOrders/fulfilled',
    payload: ordersResponse.orders
  });
  expect(store.loading).toBeFalsy();
  expect(store.orders).toHaveLength(ordersResponse.orders.length);
});

test('load order', async () => {
  let store = ordersReducer(initialState.orders, {
    type: 'orders/loadOrder/pending'
  });
  expect(store.loading).toBeTruthy();

  store = ordersReducer(store, {
    type: 'orders/loadOrder/fulfilled',
    payload: { orders: [orderResponse.order] }
  });
  expect(store.loading).toBeFalsy();
  expect(store.orders).toHaveLength(1);
});

test('create order', async () => {
  let store = ordersReducer(initialState.orders, {
    type: 'orders/createOrder/pending'
  });
  expect(store.creating).toBeTruthy();

  store = ordersReducer(store, {
    type: 'orders/createOrder/fulfilled',
    payload: orderResponse
  });
  expect(store.creating).toBeFalsy();
  expect(store.created).toEqual(orderResponse.order);
});
