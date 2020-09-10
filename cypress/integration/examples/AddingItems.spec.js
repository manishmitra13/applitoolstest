/// <reference types="cypress" />

describe('Navigation to the product to product and trying to checkout a product', () => {
  let selectors;
  before(() => {
    cy.clearCookies({ log: true });
    cy.clearLocalStorage('cleared memory', { log: true })
    cy.fixture('locators.json').then(s => selectors = s)
    cy.visit('/');
  })

  it('Perform a shop online', () => {
    cy.contains('Fruit & Veg').click();
    cy.get(selectors.Fruit).click();
    cy.contains('Grapes').click();

    //Validation only Grapes to be shown
    cy.get(selectors.allGrapesItems).each(($el, index, $list) => {
      cy.get($el).then(() => {
          expect($el.text()).to.contain("Grapes");
      })
    })
    cy.get(selectors.addtoCartGrapes).click();
    cy.contains('Checkout').click();
  })

});
