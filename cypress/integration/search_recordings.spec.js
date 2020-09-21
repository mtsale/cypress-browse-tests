describe('Test the search filters in the Recordings page', () => {
    it('Navigates to Recordings Page', () => {
        cy.visit('/recordings')
        cy.url().should('include', '/recordings')
        .then(()=> {
            cy.log('Signing in with admin credentials...')
            cy.signIn()
        })
    })
    context('Labels and headers', () => {
        it('Displays recordings', () => {
            cy.get('.results-summary').should('contain', 'Recordings')
            cy.get('.results-summary').should('contain', 'Export')
        })

        it('Shows advanced search options', () => {
            cy.get('.toggle-advanced-search-btn').contains('Advanced search').click()
            cy.get('.form-group').find('label').should('be.visible')
            cy.find_filter('Duration')
            cy.find_filter('tags')
            cy.find_filter('Animals')
        })
        it('Executes Search', () => {
            cy.search()
        })
    })

    context('Each filter can be configured', () => {
        it('Can search by device (group)', () => {            
            cy.log('Select a device')
            cy.get('[data-cy=device-select]').click().wait(500).type('livingsprings (group) {enter}')
            cy.search()   
            cy.first_card_match('.recording-group', 'livingsprings')
        })
        it('Can filter by date range', () => {
            // Set date for testing to be between 07/09/20 and 21/09/20 @ 1200 
            const cutoffDate = Cypress.moment().subtract(30, 'days')
            cy.log('Select Date range')
            cy.get('[data-cy=date-select]').select('Custom range').then(() => {
                cy.get('[data-cy=date-from]').click().type('2020-09-01')
                cy.get('[data-cy=date-to]').click().type('2020-09-21')
            })
            cy.search()
        })
        it('Can filter by recording type', () => {
            cy.log('Select Video only')
            cy.get('[data-cy=recording-select]').select('Video only')
            cy.search()
            // cy.first_card_match('.recording-type', '?') // TODO: Get access video/audio tags 
        })
        it('Can filter by duration', () => {
            cy.log('Select Duration')
            cy.get('[data-cy=duration-select]').select('Short (<20 seconds)')
            cy.search()
            cy.get('.recording-duration').first().contains('seconds')
            
        })
        it('Can filter by tag', () => {
            cy.log('Select Tag')
            cy.get('[data-cy=tag-select]').select('Animal interacted with trap')
            cy.search()
            cy.get('.recording-tags').first().contains('interaction')
        })
        it('Can filter by animal', () => {
            cy.log('Select Animal or attribute - testing with a cat')
            cy.get('[data-cy=animal-select]').click('').wait(200).type('cat {enter}')
            cy.search()
            cy.get('.recording-tags').first().contains('cat')
        })
    })

});

