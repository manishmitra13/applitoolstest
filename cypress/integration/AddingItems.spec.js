/// <reference types="cypress" />

describe('Navigation to the product to product and trying to checkout a product', async () => {
  let selectors;
  before(()=>{
    cy.clearCookies({ log: true });
    cy.clearLocalStorage('cleared memory', { log: true })
    cy.fixture('locators.json').then(s => selectors = s)
    cy.visit('/');
  });

  afterEach(()=>{
    cy.clearCookies({ log: true });
    cy.clearLocalStorage('cleared memory', { log: true })
  })

  it('Perform a shop online - Checking if grapes exist in grapes', () => {
    cy.clickLink(selectors.Header,'Fruit & Veg')
    cy.clickLink(selectors.leftNav,'Fruit');
    cy.clickLink(selectors.leftNav,'Grapes');
    //Validation only Grapes to be shown
    cy.get(selectors.allGrapesItems).each(($el) => {
      cy.get($el).then(() => {
        expect($el.text()).to.contain("Grapes");
      })
    })
    cy.get(selectors.addtoCartGrapes).click();
    cy.contains('Checkout').click();
  })

  it('Validate the items in the nav Bar also check if all are clickable', () => {
    cy.get('.categoryHeader-navigationLink').invoke('text').then((text) => {
      expect(text).to.contains('Specials');
      expect(text).to.contains('Fruit & Veg');
      expect(text).to.contains('Household');
    });
    cy.get('.categoryHeader-navigationLink').click({ multiple: true, force: true });
  })

  it('Searching and Adding the Items to Cart - ShortCutWay', () => {
    cy.searchItem('Pauls Vanilla Custard 1kg');
    cy.searchItem('Ocean Blue Surimi Sea Sticks 150g');
    cy.searchItem('Woolworths Bread Rolls Soft Hamburger 6 pack');
    cy.searchItem('Woolworths Bread White Extra Soft Loaf 680g');
    cy.get(selectors.viewCart).click();
    cy.get(selectors.cartvalue).invoke('text').then((text)=>{
      expect(text.trim()).to.equal('$13.00');
    });
  });

  it('adding items form each category and check the total - Long Way', () => {  
    //Created a custom command click Link.
    cy.visit('/');
    cy.clickLink(selectors.Header,'Meat, Seafood & Deli');
    cy.clickLink(selectors.leftNav,'Seafood');
    cy.clickLink(selectors.leftNav,'Show All Seafood');
    cy.clickLinkInsideTile(selectors.linkintile,'Ocean Blue Surimi Sea Sticks 150g');
    cy.get(selectors.addtoCartSingle).click({force : true});
    cy.get(selectors.closeCartButton).click({force : true});

    cy.clickLink(selectors.Header,'Dairy, Eggs & Fridge');
    cy.clickLink(selectors.leftNav,'Cream, Custard & Desserts');
    cy.clickLink(selectors.leftNav,'Show All Cream, Custard & Desserts');
    cy.clickLinkInsideTile(selectors.linkintile,'Pauls Vanilla Custard 1kg');
    cy.get(selectors.addtoCartSingle).click({force : true});
    cy.get(selectors.closeCartButton).click({force : true});
    
    cy.clickLink(selectors.Header,'Bakery');
    cy.clickLink(selectors.leftNav,'In-Store Bakery');
    cy.clickLink(selectors.leftNav,'Bread');
    cy.clickLinkInsideTile(selectors.linkintile,'Woolworths Bread White Extra Soft Loaf 680g');
    cy.get(selectors.addtoCartSingle).click({force : true});
    cy.get(selectors.closeCartButton).click({force : true});

    cy.clickLink(selectors.Header,'Bakery');
    cy.clickLink(selectors.leftNav,'In-Store Bakery');
    cy.clickLink(selectors.leftNav,'Bread');
    cy.clickLinkInsideTile(selectors.linkintile,'Woolworths Bread Rolls Soft Hamburger 6 pack');
    cy.get(selectors.addtoCartSingle).click({force : true});
    cy.get(selectors.closeCartButton).click({force : true});

    cy.get(selectors.viewCart).click();
    cy.get(selectors.cartvalue).invoke('text').then((text)=>{
      expect(text.trim()).to.equal('$13.00');
    });
  });

  it('Add all the items for a Recipes',() =>{
    cy.visit('/');
    cy.clickLink(selectors.mainTab,'Recipes');
    cy.clickCuisine(selectors.navigationSubLink,'Cuisine');
    cy.clickCuisine(selectors.navigationSubLink,'Australian');
    cy.clickLink(`.recipeTile-headerAnchor`,'Easter Egg Pancakes');
    cy.wait(5000);
    cy.clickButton(`.button.button--primary`,'Add all');
    cy.wait(5000);
    cy.get(selectors.viewCart).click();
    cy.get(selectors.cartvalue).invoke('text').then((text)=>{
      expect(text.trim()).to.equal('$11.85');
    });
  })
});
