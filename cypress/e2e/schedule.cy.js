describe('Full Calendar Component Tests', () => {
    
  beforeEach(() => {
      // Sign in before visiting the Home page
      cy.session("signed-in", () => {
          cy.signIn();
        });
      cy.visit("/Schedule", {
      failOnStatusCode: false,
      });
    });

    
    it(`Clicks Month Button`, () => {

      cy.get('button').contains('month').click();

     
    });

    it('should allow selecting dates', () => {
      // Trigger a date selection
      cy.get('button').contains('Create Event').click();
      // Check if the event handler is called (assuming it changes some state or opens a modal, etc.)
    });
  
  });

