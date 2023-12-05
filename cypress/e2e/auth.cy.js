
describe("Signed in", () => {
  
    beforeEach(() => {
      cy.session("signed-in", () => {
        cy.signIn();
      });
    });
  
    it("navigate to the dashboard", () => {
      // open dashboard page
      cy.visit("/", {
        failOnStatusCode: false,
      });
  
    });
  
    it("SSR: navigate to the ssr dashboard", () => {
      // open dashboard page
      cy.visit("/", {
        failOnStatusCode: false,
      });
  
      // check if buttons are there
      cy.contains('Calendar')
      cy.contains('Organization') 
      cy.contains('Messaging')  
    });
  });
  