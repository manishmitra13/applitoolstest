/// <reference types="cypress" />

describe('Navigation to the product to product and trying to checkout a product', () => {
  let selectors;
  before(() => {
    cy.clearCookies({ log: true });
    cy.clearLocalStorage('cleared memory', { log: true })
    cy.fixture('locators.json').then(s => selectors = s)
    cy.visit('/');
  })

  it('Filling up the SignUp application anc checking for the error', () => {
    cy.contains('Log in / Signup').click();
    cy.contains('New to Woolworths online').click();
    cy.get(selectors.firstName).type("ManishAppliTest");
    cy.get(selectors.lastName).type("ManishAppliTest");
    cy.get(selectors.emailName).type("sample@sample.com");
    cy.get(selectors.password).type("Manish01");
    cy.get(selectors.dateofBirth).type("11/11/1990");
    cy.get(selectors.prefferedContactNumber).type("0451878192");
    cy.get(selectors.clickNo).click();
    cy.get(selectors.YesConditions).click();
    cy.get(selectors.SignUp).click();
    cy.get('.formValidationSummary-text').contains("The sign up was not successful.");
  })

});
