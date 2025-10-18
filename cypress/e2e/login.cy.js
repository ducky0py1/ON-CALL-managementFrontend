/**
 * =====================================================================
 * Cypress E2E Test for the Complete Authentication Flow
 * =====================================================================
 * This test simulates a real user's journey:
 * 1. Visiting the homepage.
 * 2. Navigating to the login page.
 * 3. Trying to log in with incorrect credentials.
 * 4. Logging in with correct credentials.
 * 5. Verifying the dashboard is loaded.
 * 6. Logging out.
 *
 * It assumes the backend server is running at http://127.0.0.1:8000
 * and the frontend server is running at http://localhost:3000.
 */

describe('Authentication Flow Test', () => {

  // This 'beforeEach' hook runs before each test ('it' block).
  // It ensures we start from a clean state by logging out and visiting the homepage.
  beforeEach(() => {
    cy.visit('http://localhost:3000/'); // Start at the public homepage
  });

  /**
   * Test Scenario 1: A user with incorrect credentials should see an error message.
   */
  it('should fail with incorrect credentials and display an error message', () => {
    // Navigate to the login page
    cy.visit('http://localhost:3000/login');
    
    // Find the email input by its 'name' attribute and type an incorrect email
    cy.get('input[name="email"]').type('wrong@email.com');
    
    // Find the password input and type an incorrect password
    cy.get('input[name="password"]').type('wrongpassword');

    // Find the submit button and click it
    cy.get('button[type="submit"]').click();

    // --- Verification ---
    // The URL should NOT change. We should still be on the login page.
    cy.url().should('include', '/login');

    // An error message should appear on the screen.
    // We look for the specific error text returned by our Laravel API.
    cy.contains('Email ou mot de passe incorrect').should('be.visible');
  });


  /**
   * Test Scenario 2: A valid user (Admin) can log in and is redirected to the dashboard.
   */
  it('should log in a valid admin user successfully and redirect to the dashboard', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('admin@astreinte.local');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    // --- Verification ---
    // The URL should change to include '/app', which is our protected route area.
    cy.url().should('include', '/app');

    // We should see text that only appears on the dashboard,
    // for example, the main title from DashboardHeader.js.
    cy.contains("Tableau de Bord OCP").should('be.visible');

    // We can also verify that the sidebar is present.
    cy.contains("Tableau de Bord OCP", { timeout: 10000 }).should('be.visible');
    
  });


  /**
   * Test Scenario 3: A logged-in user can log out.
   */
  it('should allow a logged-in user to log out', () => {
    // --- Setup: Log in the user first ---
    // Cypress allows creating custom commands for repetitive tasks like logging in.
    // For now, we will do it manually in the test.
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('admin@astreinte.local');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    
    // Wait for the dashboard to load to be sure we are logged in
    cy.url().should('include', '/app');
    cy.contains("Tableau de Bord OCP", { timeout: 10000 }).should('be.visible');

    // --- Action: Log out ---
    // Find the "Déconnexion" button in the sidebar and click it.
    cy.contains('Se déconnecter').click();

    // --- Verification ---
    // After logging out, we should be redirected to the public homepage.
    cy.url().should('eq', 'http://localhost:3000/'); // 'eq' means "equals"

    // The text from the protected dashboard should no longer be visible.
    cy.contains("Vue d'Tableau de Bord OCP").should('not.exist');
    
    // The public homepage title should be visible.
    cy.contains('Optimisez la Gestion de Vos Équipes OCP').should('be.visible');
  });

});