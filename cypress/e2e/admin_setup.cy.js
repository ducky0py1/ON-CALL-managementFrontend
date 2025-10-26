// cypress/e2e/admin_setup.cy.js

describe('Admin Setup', () => {
  
  it('should reset the database and create all necessary test data', () => {
    // 1. Reset the database to a clean state
    cy.request('POST', 'http://localhost:8000/api/_test/reset-database');

    // 2. Create the Admin user
    cy.request('POST', 'http://localhost:8000/api/register', {
        nom: "Admin", prenom: "Test", email: "admin@test.com", password: "password", role_type: "admin"
    });

    // 3. Login as the Admin and save the token to a Cypress environment variable
    cy.request('POST', 'http://localhost:8000/api/login', { email: 'admin@test.com', password: 'password' })
      .its('body.access_token') // Get the token string
      .then(token => {
        Cypress.env('adminToken', token); // Save it for this test run

        // 4. Use the token to create the Service
        cy.request({
          method: 'POST',
          url: 'http://localhost:8000/api/services',
          headers: { Authorization: `Bearer ${token}` },
          body: { nom: "Service A", code_service: "SRV-A" }
        });

        // 5. Use the token to create the Secretary and assign her to the Service
        cy.request({
          method: 'POST',
          url: 'http://localhost:8000/api/users',
          headers: { Authorization: `Bearer ${token}` },
          body: { 
            nom: "Secretaire", prenom: "Test", email: "secretaire@test.com",
            password: "password", role_type: "secretaire", service_id: 1
          }
        });

        // 6. Use the token to create the Agent
        cy.request({
          method: 'POST',
          url: 'http://localhost:8000/api/agents',
          headers: { Authorization: `Bearer ${token}` },
          body: { service_id: 1, matricule: "A01", nom: "Cypress", prenom: "Agent", telephone_principal: "..." }
        });
      });
  });
});