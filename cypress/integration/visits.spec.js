/*
*   Cypress test script to test functionality and perforance
*   of Cacophony Browse - Visits. 
*
*/

describe('Test functionality and performance of Visits', () => {

    it('Navigates to Visits Page', () => {
        cy.visit('/visits')
        cy.url().should('include', '/visits')
        .then(()=> {
            cy.log('Signing in with admin credentials...')
            cy.signIn()
        })
    })

    context('Visits UI and results', () => {
        it('Does not request all data on initial load', () => {
            cy.get('.results').should('not.be.visible')
        })
        it('Prompts user to select devices before initiating search', () => {
            cy.get('h5').contains('Please select') // this is a loose assertion checking that part of the message displays
        })
    })

    context.skip('Check filters give the expected results', () => {

    })

})