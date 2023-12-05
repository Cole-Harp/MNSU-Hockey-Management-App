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

    
    it('should allow simple all day event creation', () => {
      // Trigger a date selection
      cy.get('button').contains('View').click();
      
      cy.get('button').contains('Create Event').click();

      cy.findByLabelText('Title').type('Practice');
      cy.findByLabelText('Where').type('Gym');

      const today = new Date();
      const formattedDate = today.toISOString().substring(0, 10);      

      cy.findByLabelText('Date').type(formattedDate);

      cy.findByLabelText('All Day').check();

      cy.findByText('Submit').click();
    });

    it('should allow simple all day recurring event creation', () => {
      // Trigger a date selection
      cy.get('button').contains('View').click();
      
      cy.get('button').contains('Create Event').click();

      cy.findByLabelText('Title').type('Practice');
      cy.findByLabelText('Where').type('Gym');

      const today = new Date();
      const formattedDate = today.toISOString().substring(0, 10);      

      cy.findByLabelText('Date').type(formattedDate);

      cy.findByLabelText('All Day').check();

      cy.findByText('Submit').click();
    });
  
  });

