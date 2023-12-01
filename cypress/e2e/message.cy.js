beforeEach(() => {
  // Sign in before visiting the Home page
  cy.session("signed-in", () => {
      cy.signIn();
    });
  cy.visit("/Messaging", {
  failOnStatusCode: false,
  });
});