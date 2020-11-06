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
        it('Has 7 days as the default range', () => {
            cy.get('[data-cy=date-select]').contains('7 days');
        })
        it('Executes Search', () => {
            cy.search()
        })
    })

    context('Each filter can be configured', () => {
        it('Can search by device (group)', () => {            
            cy.log('Select a device')
            cy.get('[data-cy=device-select]').click().wait(500).type('test_woodend {enter}')
            cy.search()   
            cy.first_card_match('.recording-group', 'test_woodend')
        })
        it('Can filter by date range', () => {
            // Set date range for testing to be between 01/10/20 and 01/11/20 @ 1200 
            cy.log('Select Date range')
            cy.get('[data-cy=date-select]').select('Custom range').then(() => {
                cy.get('[data-cy=date-from]').click().type('2020-10-01')
                cy.get('[data-cy=date-to]').click().type('2020-11-01')
            })
            cy.search()
        })
        it('Can filter by recording type', () => {
            cy.log('Select Video only')
            cy.get('[data-cy=recording-select]').select('Video only')
            cy.search()
            cy.get('.recording-type').first().children('span').children('svg').should('have.class', 'fa-file-video')
        })
        it('Can filter by duration', () => {
            cy.log('Select Duration')
            cy.get('[data-cy=duration-select]').select('Short (<20 seconds)')
            cy.search()
            cy.get('.recording-duration').first().contains('seconds')
            
        })
        it('Can filter by tag', () => {
            cy.log('Select Tag')
            cy.get('[data-cy=tag-select]').select('human tagged as...')
            cy.search()
            cy.get('.recording-tags').first().contains('cat')
        })
        it('Can filter by animal', () => {
            cy.log('Select Animal or attribute - testing with a cat')
            cy.get('[data-cy=animal-select]').click('').wait(200).type('cat {enter}')
            cy.search()
            cy.get('.recording-tags').first().contains('cat')
        })
    })

    context('URL Tests', () => {
        it('Reloads the page and produces the same search results', () => {
            cy.url().then((initial) => {
                cy.visit(initial)
                cy.signIn()
                // Check that new results match the initial search
                cy.get('.results-summary').should('contain', '1 matches')
            })
        })

    })

    context('Test recordings navigation', () => {
        it('Opens card recordings in same tab', () => {
            cy.get('.search-results').wait(1500).first() // give time for results to load
            cy.get('.recording-details').first().click()
            cy.url().should('include', '/recording/')
        })
        it('Replays previous video & alerts if next mp4 does not exist', () => {
            // TODO: implement a Cypress data tag to the navigation elements
            cy.get('.img-buttons').children('span').children('svg').last().should('have.attr', 'data-icon', 'angle-right').click()
            cy.get('.alert')
        })
        it('Navigate to previous video', () => {
            // TODO: implement a Cypress data tag to the navigation elements
            cy.get('.img-buttons').children('span').children('svg').first().should('have.attr', 'data-icon', 'angle-left').click()
            cy.get('.alert')
        })
    })

});

