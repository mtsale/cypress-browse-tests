const userMenu = '.dropdown.profile';

Cypress.Commands.add("signIn", () => {

  cy.fixture('profile.json').then((json) => {
    expect(json).to.be.an('object')
    cy.get("[placeholder='Username or Email Address']").type(json.email);
    cy.get("[placeholder='Password']").type(json.password, { log: false });
    cy.contains("Sign in").click().then(() => {
        // check sign in worked
        cy.log("Verifying sign in successful");
        cy.get(userMenu).wait(1500).should('contain', json.name);
    })
  })

});


/*
* Commands for Search filter tests
*/ 

// Command to find filter in the Query recordings section by name
Cypress.Commands.add("find_filter", (name) => {
    cy.log('Finding filter: ' + name)
    cy.get('.query-recordings').should('contain', name)
});


// Looks for selected filter match in the first CARD of results
Cypress.Commands.add("first_card_match", ($class, attr) => {
    cy.log('Finding match in first result: ' + attr)
    cy.get('.search-results').wait(1500).first() // give time for results to load
    cy.get($class).first().contains(attr)
});

// Looks for selected filter match in the first ROW of results
Cypress.Commands.add("first_row_match", (attr) => {
  cy.log('Finding match in first result: ' + attr)
  cy.get('.search-results').wait(1500) // give time for results to load

  cy.get('.results').within(() => {
    cy.get('.all-rows').first().contains(attr)
}) 
});


// Query recordings via the Search button in the 'Search recordings' pane
Cypress.Commands.add("search", () => {
    cy.log('Searching recordings....')
    cy.get('.query-recordings').within(() => {
      cy.get('button').contains('Search').click()
    }) 
});


/*
* Commands for responsive tests
*/ 

// Query recordings via the Search button in the 'Search recordings' pane
Cypress.Commands.add("check_responsive_navbar", (device) => {
  cy.log('Checking navbar component are visible for this screen size')
    // check navbar is visible, then resize to given viewport and check again
    cy.get('.navbar').should('be.visible')
    cy.viewport(device)
    // the navbar should have collapsed on smaller screens
    cy.get('.navbar').should('be.visible')
    cy.get('.navbar-toggler').should('be.visible').click()
    cy.get('.navbar').find('a').should('be.visible')
    
});

