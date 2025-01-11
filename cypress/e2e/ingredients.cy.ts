import { selectors, api } from '../constants';
import { ingredientsResponse } from '../mocks/ingredients';
import { orderResponse } from '../mocks/order';
import { userPayload, userResponse } from '../mocks/user';

describe('Бургер-конструктор', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/');
    cy.intercept('GET', api.ingredients, {
      statusCode: 200,
      body: ingredientsResponse
    }).as('ingredients');
    cy.wait(['@ingredients']);
    cy.intercept('GET', api.orders, {
      statusCode: 200,
      body: {
        success: true,
        data: []
      }
    }).as('orders');
    cy.wait(['@orders']);
  });

  it('Добавление ингредиентов в бургер', () => {
    cy.get(selectors.add_ingredient_bun).click();
    cy.get(selectors.add_ingredient_sauce).click();
    cy.get(selectors.add_ingredient_main).click();
    cy.get(selectors.constructor_ingredient_bun).should('have.length', 2);
    cy.get(selectors.constructor_ingredient_sauce).should('be.visible');
    cy.get(selectors.constructor_ingredient_main).should('be.visible');
  });

  it('Попап с деталями ингредиента', () => {
    cy.get(selectors.ingredient_bun).click();
    cy.get(selectors.close_modal).should('be.visible');
    cy.get(selectors.close_modal).click();
    cy.get(selectors.close_modal).should('not.exist');
  });

  it('Попап с деталями ингредиента, клик на оверлэй', () => {
    cy.get(selectors.ingredient_bun).click();
    cy.get(selectors.close_overlay_modal).should('exist');
    cy.get(selectors.close_overlay_modal).click({ force: true });
    cy.get(selectors.close_overlay_modal).should('not.exist');
  });

  it('Оформление заказа', () => {
    cy.visit('/login');
    cy.intercept('GET', api.ingredients, {
      statusCode: 200,
      body: ingredientsResponse
    }).as('ingredients');
    cy.wait(['@ingredients']);
    cy.intercept('GET', api.orders, {
      statusCode: 200,
      body: {
        success: true,
        data: []
      }
    }).as('orders');
    cy.wait(['@orders']);
    cy.get(selectors.input_username).type(userPayload.email);
    cy.get(selectors.input_password).type(userPayload.password);
    cy.get(selectors.login_button).click();
    cy.intercept(
      {
        method: 'POST',
        url: api.login
      },
      {
        statusCode: 200,
        body: userResponse
      }
    ).as('loginRq');
    cy.wait(['@loginRq']);

    cy.getCookie('accessToken').get('value').should('not.be.empty');
    cy.getCookie('refreshToken').get('value').should('not.be.empty');

    cy.get(selectors.add_ingredient_bun).click();
    cy.get(selectors.add_ingredient_sauce).click();
    cy.get(selectors.add_ingredient_main).click();
    cy.get(selectors.order_button).click();
    cy.intercept(
      {
        method: 'POST',
        url: api.order,
        headers: {
          Authorization: userResponse.accessToken
        }
      },
      {
        statusCode: 200,
        body: orderResponse
      }
    ).as('orderCreate');
    cy.wait(['@orderCreate']);
    cy.get(selectors.close_modal).should('be.visible');
    cy.get(selectors.created_order_number).should('be.visible');
    cy.get(selectors.created_order_number).contains(orderResponse.order.number);
    cy.get(selectors.close_overlay_modal).click({ force: true });
    cy.get(selectors.close_overlay_modal).should('not.exist');
    cy.get(selectors.constructor_ingredient_bun).should('not.exist');
    cy.get(selectors.constructor_ingredient_sauce).should('not.exist');
    cy.get(selectors.constructor_ingredient_main).should('not.exist');
  });
});
