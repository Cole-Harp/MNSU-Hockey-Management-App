describe('Home Component Tests', () => {
    
    beforeEach(() => {
        // sign in with clerk before visiting the Home page (in commands.js)
        cy.session("signed-in", () => {
            cy.signIn();
          });
        cy.visit("/", {
        failOnStatusCode: false,
        });
      });
  
    it('renders the Home component', () => {
      cy.get('h1').contains('Hockey Team Management');
      cy.get('ul').should('have.class', 'grid');
    });
  
    const links = [
      { text: 'Organization', href: '/Admin_Dashboard' },
      { text: 'Calendar', href: '/Schedule' },
      { text: 'Messaging', href: '/Messaging' },
    //   { text: 'Drills', href: '/Drills' },
    //   { text: 'Profile', href: '/Profile' },
    //   { text: 'Example 2', href: '/' },
    ];
  
    links.forEach(link => {
      it(`navigates to ${link.text} page`, () => {
        cy.get('ul').contains('li', link.text).click();
        cy.url().should('include', link.href);
      });
    });
  });

