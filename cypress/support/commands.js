const userMenu = '.dropdown.profile';

Cypress.Commands.add("signIn", () => {

  cy.fixture('profile.json').then((json) => {
    expect(json).to.be.an('object')
    cy.get("[placeholder='Username or Email Address']").type(json.email);
    cy.get("[placeholder='Password']").type(json.password, { log: false });
    cy.contains("Sign in").click().then(() => {
        // check sign in worked
        cy.log("Verifying sign in successful");
        cy.get(userMenu).should('contain', json.name);
    })
  })

});
