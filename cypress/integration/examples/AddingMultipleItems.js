/// <reference types="cypress" />

describe('Adding Multiple Items', () => {
  let selectors;
  before(() => {
    cy.clearCookies({ log: true });
    cy.clearLocalStorage('cleared memory', { log: true })
    cy.fixture('locators.json').then(s => selectors = s)
    cy.visit('/');
  })

  it('Perform a shop online - Checking if grapes exist in grapes', () => {
    cy.contains('Meat, Seafood & Deli').click();
    //Validation of the left Nav in Meat
    cy.get(selectors.leftNavMeat).contains('Meat')
    cy.get(selectors.leftNavMeat).click();
    cy.contains('Show All Meat').click();

    //Validation the Meat in the list
    cy.get(selectors.allmeatItems).each(($el)=>{
      cy.get($el).invoke('text').then((text)=>{
        if(text.trim() === 'Meat'){
         expect(text.trim()).to.equal('Meat');
        }
      })
    })

    cy.get(selectors.clickchicken).click();
    cy.get(selectors.addtoCartSingle).click();
    //Adding one more Product
    cy.contains('Dairy, Eggs & Fridge').click();
    cy.contains('Cheese').click();
    cy.contains('Show All Cheese').click();
    cy.contains('Cheese Specials').click();
    cy.get(selectors.cartoffscreen).click();
    cy.contains('Bega Tasty Natural Cheese Slices 15 pack 250g').click();
    cy.get(selectors.addtoCartSingle).click();
    cy.get(selectors.viewCart).click();
    cy.get(selectors.cartvalue).invoke('text').then((text)=>{
      expect(text.trim()).to.equal('$15.75');
    });
    cy.get(selectors.checkOut).click();

    //Validation if Login page is returned

    cy.get(selectors.LoginMessage).invoke('text').then((text)=>{
      expect(text.trim()).to.equal('Enter your details below to log in, or sign up.');
    })
  })

});
