/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


// Cypress.Commands.add('signIn', (username, password) => {
//   cy.visit({url: '/sign-in', failOnStatusCode: false})

//   cy.get('input[name=identifier]').type(Cypress.env(`test_email`),)
//   cy.contains('Continue').click() // Click on first el containing 'Welcome'
//   // {enter} causes the form to submit
//   cy.get('input[name=password]').type(`${Cypress.env(`test_pass`)}{enter}`, { log: false })
//   cy.contains('Continue').click() // Click on first el containing 'Welcome'
//   // we should be redirected to /dashboard
//   cy.url().should('include', '/')

//   // our auth cookie should be present
//   cy.getCookie('your-session-cookie').should('exist')

//   // UI should reflect this user being logged in
//   cy.get('h1').should('contain', username)
// })


Cypress.Commands.add(`signOut`, () => {
  cy.log(`sign out by clearing all cookies.`);
  cy.clearCookies({ domain: "localhost:3000" });
});
Cypress.Commands.add(`signIn`, () => {
  cy.log(`Signing in.`);
  cy.visit({url: '/sign-in', failOnStatusCode: false})
  cy.window()
    .should((window) => {
      expect(window).to.not.have.property(`Clerk`, undefined);
      expect(window.Clerk.isReady()).to.eq(true);
    })
    .then(async (window) => {
      await cy.clearCookies({ domain: window.location.domain });
      const res = await window.Clerk.client.signIn.create({
        identifier: Cypress.env(`test_email`),
        password: Cypress.env(`test_password`),
      });
      await window.Clerk.setActive({
        session: res.createdSessionId,
      });
      cy.log(`Finished Signing in.`);
    });
});