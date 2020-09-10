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
    cy.eyesOpen({
      appName: 'AppOne',
      testName: 'Check for Fruit and Veg',
    })

    cy.contains('Fruit & Veg').click();
    cy.get(selectors.Fruit).click();
    cy.contains('Grapes').click();

    cy.eyesCheckWindow({
      tag: "GrapesSection",
      target: 'window',
      fully: true
  });
    //Validation only Grapes to be shown
    cy.get(selectors.allGrapesItems).each(($el, index, $list) => {
      cy.get($el).then(() => {
        expect($el.text()).to.contain("Grapes");
      })
    })
    cy.get(selectors.addtoCartGrapes).click();

    cy.eyesCheckWindow({
      tag: "CheckoutSection",
      target: 'window',
      fully: true
  });
    cy.contains('Checkout').click();
    cy.eyesClose();
  })

});
