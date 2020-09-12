import 'cypress-wait-until';


Cypress.Commands.add('clickLink', (inboundCss, actualText) => {
    cy.waitUntil(() => cy.get(`${inboundCss}`).should('be.visible'));
    cy.get(`${inboundCss}`).each(($el) => {
        cy.wrap($el).then(($el) => {
            cy.get($el).invoke('text').then((text) => {
                if (text.trim() === actualText) {
                    cy.get($el).click({ force: true });
                }
            });
        })
    })
})

Cypress.Commands.add('clickLinkInsideTile', (inboundCss, actualText) => {
    cy.wait(5000);
    cy.waitUntil(() => cy.get('.shelfProductTile.tile').should('be.visible'));
    cy.get(`${inboundCss}`, { timeout: 10000 }).each(($el) => {
        cy.wrap($el).then(($el) => {
            cy.get($el).invoke('text').then((text) => {
                if (text.trim() === actualText) {
                    cy.get($el).click({ force: true });
                }
            });
        })
    })
})

Cypress.Commands.add('searchItem', (actualText) => {
    cy.get('.headerSearch-searchBox').type(actualText);
    cy.get('.iconAct-Search.search-button-icon').click({ force: true });
    cy.clickLinkInsideTile(`.shelfProductTile-descriptionLink`, actualText);
    cy.get('.cartControls-addCart').click({ force: true });
    cy.get('.cartOffscreen-openButton').click({ force: true });
})



