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
    cy.eyesOpen({
      appName: 'Login of Woolworth',
      testName: 'Signup Page',
    })
    cy.eyesCheckWindow({
      tag: "Login Window",
      target: 'window',
      fully: true
    });

    cy.contains('Log in / Signup').click({force: true});
    cy.contains('New to Woolworths online').click({force: true});
    cy.get(selectors.firstName).type("ManishAppliTest");
    cy.get(selectors.lastName).type("ManishAppliTest");
    cy.get(selectors.emailName).type("sample@sample.com");
    cy.get(selectors.password).type("Manish01");
    cy.get(selectors.dateofBirth).type("11/11/1990");
    cy.get(selectors.prefferedContactNumber).type("0451878192");
    cy.get(selectors.clickNo).click({force: true});
    cy.get(selectors.YesConditions).click({force: true});
    cy.eyesCheckWindow({
      tag: "Form Before Signup_New",
      fully: true
    });
    cy.get(selectors.SignUp).click({force: true});
    cy.get('.formValidationSummary-text').contains("The sign up was not successful.");

    cy.eyesClose()
  })

});
