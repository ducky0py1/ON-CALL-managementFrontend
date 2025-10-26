// /**
//  * =====================================================================
//  * Cypress E2E Test for the Authentication Flow + Connexion Buttons
//  * =====================================================================
//  */

// describe('Authentication Flow Test', () => {

//   beforeEach(() => {
//     cy.visit('http://localhost:3000/');
//   });

//   // -------------------------------------------------------------------
//   // 1️⃣ Incorrect login should show an error
//   // -------------------------------------------------------------------
//   it('should fail with incorrect credentials and display an error message', () => {
//     cy.visit('http://localhost:3000/login');
//     cy.get('input[name="email"]').type('wrong@email.com');
//     cy.get('input[name="password"]').type('wrongpassword');
//     cy.get('button[type="submit"]').click();

//     cy.url().should('include', '/login');
//     cy.contains('Email ou mot de passe incorrect').should('be.visible');
//   });

//   // -------------------------------------------------------------------
//   // 2️⃣ Successful login redirects to dashboard
//   // -------------------------------------------------------------------
//   it('should log in a valid admin user and redirect to the dashboard', () => {
//     cy.visit('http://localhost:3000/login');
//     cy.get('input[name="email"]').type('admin@astreinte.local');
//     cy.get('input[name="password"]').type('password');
//     cy.get('button[type="submit"]').click();

//     cy.url().should('include', '/app');
//     cy.contains('Tableau de Bord OCP', { timeout: 10000 }).should('be.visible');
//   });

//   // -------------------------------------------------------------------
//   // 3️⃣ Logout should redirect to homepage
//   // -------------------------------------------------------------------
//   it('should allow a logged-in user to log out', () => {
//     cy.visit('http://localhost:3000/login');
//     cy.get('input[name="email"]').type('admin@astreinte.local');
//     cy.get('input[name="password"]').type('password');
//     cy.get('button[type="submit"]').click();

//     cy.url().should('include', '/app');
//     cy.contains('Tableau de Bord OCP', { timeout: 10000 }).should('be.visible');

//     cy.contains('Se déconnecter').click();
//     cy.url().should('eq', 'http://localhost:3000/');
//     cy.contains('Optimisez la Gestion de Vos Équipes OCP').should('be.visible');
//   });

//   // -------------------------------------------------------------------
//   // 4️⃣ Test navigation via “Connexion” button + route protection
//   // -------------------------------------------------------------------
//   it('should navigate to the login page via the Connexion button and protect dashboard routes', () => {
//     // Click the “Connexion” button from the homepage
//     cy.visit('http://localhost:3000/');
//     cy.contains('Connexion').click();

//     // Verify redirection to login page
//     cy.url().should('include', '/login');
//     cy.contains('Connexion').should('be.visible');

//     // Try accessing the protected route directly
//     cy.visit('http://localhost:3000/app');

//     // Should redirect back to login if not logged in
//     cy.url().should('include', '/login');
//     cy.contains('Connexion').should('be.visible');
//   });
// });
