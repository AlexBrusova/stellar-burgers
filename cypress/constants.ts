const base_url = 'https://norma.nomoreparties.space/api/';

export const selectors = {
  ingredient_bun: '[data-test="ingredient_643d69a5c3f7b9001cfa093c"]',
  ingredient_sauce: '[data-test="ingredient_643d69a5c3f7b9001cfa0944"]',
  ingredient_main: '[data-test="ingredient_643d69a5c3f7b9001cfa0941"]',
  add_ingredient_bun:
    '[data-test="add_ingredient_643d69a5c3f7b9001cfa093c"] > button',
  add_ingredient_sauce:
    '[data-test="add_ingredient_643d69a5c3f7b9001cfa0944"] > button',
  add_ingredient_main:
    '[data-test="add_ingredient_643d69a5c3f7b9001cfa0941"] > button',
  constructor_ingredient_bun:
    '[data-test="added_ingredient_643d69a5c3f7b9001cfa093c"]',
  constructor_ingredient_sauce:
    '[data-test="added_ingredient_643d69a5c3f7b9001cfa0944"]',
  constructor_ingredient_main:
    '[data-test="added_ingredient_643d69a5c3f7b9001cfa0941"]',
  close_modal: '[data-test="close-modal"]',
  close_overlay_modal: '[data-test="close-overlay-modal"]',
  constructor_container: '[data-test="constructor-container"]',
  order_button: '[data-test="create_order_button"]',
  created_order_number: '[data-test="created_order_number"]',
  input_username: '[data-test="input_username"]',
  login_button: '[data-test="login_button"]',
  input_password: '[data-test="input_password"]'
};

export const api = {
  order: base_url + 'orders',
  orders: base_url + 'orders/all',
  ingredients: base_url + 'ingredients',
  login: base_url + 'auth/login'
};
