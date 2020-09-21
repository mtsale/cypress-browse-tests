context('Responsive Viewport', () => {
    before(() => {
      cy.visit('')
      cy.signIn()
    })
  
    it('displays the navbar on smaller screens (mobile)', () => {
  
      cy.check_responsive_navbar('iphone-xr')
  
      // Added a cy.wait() between each viewport change so you can see
      // the change otherwise it is a little too fast to see :)
      cy.wait(200)
      cy.check_responsive_navbar('iphone-x')
      cy.wait(200)
      cy.check_responsive_navbar('ipad-2', 'portrait')
      cy.wait(200)
      cy.check_responsive_navbar('iphone-6', 'landscape')
      cy.wait(200)
      cy.check_responsive_navbar('ipad-mini')
      cy.wait(200)
      cy.check_responsive_navbar('samsung-s10')
  

      // The viewport will be reset back to the default dimensions
      // in between tests (the  default can be set in cypress.json)
    })
  })