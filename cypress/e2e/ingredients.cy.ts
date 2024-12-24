import { selectors, api } from '../constants';

describe('Детальная информация об ингредиенте', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/');
    cy.intercept('GET', api.ingredients).as('ingredients');
    cy.wait(['@ingredients']);
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
});
