describe('Test the search filters in the Recordings page', () => {
    context('Navigate to Recordings Page', () => {
        it('Login as user', () => {
            cy.visit('/recordings')
            .then(()=> {
                cy.log('Signing in with admin credentials...')
                cy.signIn()
            })
        })
    })
})