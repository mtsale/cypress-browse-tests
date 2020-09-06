
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
        it('Displays search filters', () => {
            cy.find_filter('Search')
            cy.find_filter('Device')
            cy.find_filter('Recording Type')
            cy.find_filter('Date range')
            cy.find_filter('Advanced')
        })
        it('Shows advanced search options', () => {
            cy.get('.toggle-advanced-search-btn').contains('Advanced search').click()
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

            cy.get('.search-results').contains('livingsprings')
        })
        it('Can filter by recording type', () => {
            cy.log('Select Video only')
            cy.get('[data-cy=recording-select]').select('Video only')
            cy.search()
            cy.get('.search-results').contains('Video only')
        })
        it('Can filter by date range', () => {
            const cutoffDate = Cypress.moment().subtract(30, 'days')
            cy.log('Select Date range')
            cy.get('[data-cy=date-select]').select('Last 30 days')
            cy.search()
            // TODO: Fail if find recordings older than 30 days. howto Ref current date???
            cy.get('.search-results').should('contain', cutoffDate.format('L'))
        })
        it('Can filter by duration', () => {
            cy.log('Select Duration')
            cy.get('[data-cy=duration-select]').select('Short (<20 seconds)')
            cy.search()
            cy.get('.search-results').contains('seconds')
        })
        it('Can filter by tag', () => {
            cy.log('Select Tag')
            cy.get('[data-cy=tag-select]').select('Cool video')
            cy.search()
            cy.get('.search-results').contains('cool')
        })
        it('Can filter by animal', () => {
            cy.log('Select Duration')
            cy.get('[data-cy=animal-select]').select('')
            cy.search()
            cy.get('.search-results').contains('cat')
        })
    })
});

