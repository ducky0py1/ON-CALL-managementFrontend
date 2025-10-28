// cypress/e2e/secretary_workflow.cy.js
describe('Secretary Dashboard Workflow', () => {

  // This beforeEach hook will now be simple and robust.
  beforeEach(() => {
    // 1. Reset the database
    cy.request('POST', 'http://localhost:8000/api/_test/reset-database');

    // 2. Create the Admin user
    cy.request('POST', 'http://localhost:8000/api/register', {
        nom: "Admin", prenom: "Test", email: "admin@test.com", password: "password", role_type: "admin"
    });

    // --- THIS IS THE FIX ---
    // 3. Manually log in as Admin and get the token
    cy.request('POST', 'http://localhost:8000/api/login', { email: 'admin@test.com', password: 'password' })
      .then((loginResponse) => {
        // We now have direct access to the response and can extract the token string.
        const adminToken = loginResponse.body.access_token;
        
        // 4. Use this guaranteed-correct token to set up the world
        
        // Create Service A
        cy.request({
          method: 'POST',
          url: 'http://localhost:8000/api/services',
          headers: { Authorization: `Bearer ${adminToken}` },
          body: { nom: "Service A", code_service: "SRV-A" }
        });

        // Create the Secretary and assign her to Service A
        cy.request({
          method: 'POST',
          url: 'http://localhost:8000/api/users',
          headers: { Authorization: `Bearer ${adminToken}` },
          body: { 
            nom: "Secretaire", prenom: "Test", email: "secretaire@test.com",
            password: "password", role_type: "secretaire", service_id: 1 
          }
        });
        
        // Create the Agent in Service A
        cy.request({
          method: 'POST',
          url: 'http://localhost:8000/api/agents',
          headers: { Authorization: `Bearer ${adminToken}` },
          body: { service_id: 1, matricule: "A01", nom: "Cypress", prenom: "Agent", telephone_principal: "..." }
        });
      });
  });  });


// ==========================================================

// TEST SCENARIO #1: Managing On-Call Periods
// ==========================================================
it('should allow a secretary to manage on-call periods', () => {
  // 1. Login as the Secretary and visit the dashboard
  cy.login('secretaire@test.com', 'password');
  cy.visit('http://localhost:3000/secretary/dashboard');
  cy.contains('h1', 'Tableau de Bord Secrétariat').should('be.visible');

  // 2. Intercept API calls and navigate to the Periods view
  cy.intercept('GET', '**/api/periodes-astreinte*').as('getPeriodes');
  cy.intercept('GET', '**/api/services*').as('getServices');
  cy.intercept('GET', '**/api/agents*').as('getAgents');
  cy.contains('button', "Périodes d'astreinte").click();
  cy.wait(['@getPeriodes', '@getServices', '@getAgents']);
  
  // 3. Verify the correct page has loaded
  cy.contains('h1', "Service A - Périodes d'Astreinte").should('be.visible');
  
  // 4. Test the Create functionality
  cy.contains('button', 'Nouvelle Période').click();
  cy.get('input#description').type('Test de Période Cypress');
  cy.get('select#service_id').select('1'); // Select service by value
  cy.get('input#date_debut').type('2025-12-01');
  cy.get('input#date_fin').type('2025-12-05');
  
  cy.intercept('POST', '**/api/periodes-astreinte').as('createPeriode');
  cy.contains('button', 'Enregistrer').click();
  cy.wait('@createPeriode');

  // 5. Verify the new period is in the table
  cy.get('table').contains('td', 'Test de Période Cypress').should('be.visible');
});

// ==========================================================
// TEST SCENARIO #2: Managing Agent Unavailabilities
// ==========================================================
it('should allow a secretary to manage agent unavailabilities', () => {
  // 1. Login as the Secretary and visit the dashboard
  cy.login('secretaire@test.com', 'password');
  cy.visit('http://localhost:3000/secretary/dashboard');
  cy.contains('h1', 'Tableau de Bord Secrétariat').should('be.visible');

  // 2. Intercept API calls and navigate
  cy.intercept('GET', '**/api/agents*').as('getAgents');
  cy.intercept('GET', '**/api/indisponibilites-agents*').as('getUnavailabilities');
  cy.contains('button', 'Indisponibilité Agents').click();
  cy.wait(['@getAgents', '@getUnavailabilities']);

  // 3. Verify the correct page has loaded
  cy.contains('h1', 'Indisponibilité des Agents').should('be.visible');

  // 4. Create a new unavailability
  cy.contains('button', 'Nouvelle Indisponibilité').click();
   cy.contains('h2', 'Nouvelle Indisponibilité').should('be.visible');

   cy.get('form').within(() => {
      // Find the select by its label, which is more user-friendly
      cy.contains('label', 'Agent *').next('select').select('Agent Cypress');
      cy.contains('label', 'Type *').next('select').select('formation');
      cy.contains('label', 'Date de Début *').next('input').type('2025-11-10');
      cy.contains('label', 'Date de Fin *').next('input').type('2025-11-12');
      cy.contains('label', 'Motif *').next('textarea').type('Formation Cypress Test');
  
  cy.intercept('POST', '**/api/indisponibilites-agents').as('createUnavailability');
  cy.contains('button', 'Enregistrer').click();
});

  cy.intercept('POST', '**/api/indisponibilites-agents').as('createUnavailability');
  cy.wait('@createUnavailability');

  // 5. Verify the creation
  cy.get('table').contains('td', 'Agent Cypress').should('be.visible');
  cy.get('table').contains('span', 'En attente').should('be.visible');


});

it('secretary_workflow', function() {
  cy.visit('localhost:3000')
  // cypress/e2e/secretary_workflow.cy.js
  describe('Secretary Dashboard Workflow', () => {
  
    // This beforeEach hook will now be simple and robust.
    beforeEach(() => {
      // 1. Reset the database
      cy.request('POST', 'http://localhost:8000/api/_test/reset-database');
  
      // 2. Create the Admin user
      cy.request('POST', 'http://localhost:8000/api/register', {
          nom: "Admin", prenom: "Test", email: "admin@test.com", password: "password", role_type: "admin"
      });
  
      // --- THIS IS THE FIX ---
      // 3. Manually log in as Admin and get the token
      cy.request('POST', 'http://localhost:8000/api/login', { email: 'admin@test.com', password: 'password' })
        .then((loginResponse) => {
          // We now have direct access to the response and can extract the token string.
          const adminToken = loginResponse.body.access_token;
          
          // 4. Use this guaranteed-correct token to set up the world
          
          // Create Service A
          cy.request({
            method: 'POST',
            url: 'http://localhost:8000/api/services',
            headers: { Authorization: `Bearer ${adminToken}` },
            body: { nom: "Service A", code_service: "SRV-A" }
          });
  
          // Create the Secretary and assign her to Service A
          cy.request({
            method: 'POST',
            url: 'http://localhost:8000/api/users',
            headers: { Authorization: `Bearer ${adminToken}` },
            body: { 
              nom: "Secretaire", prenom: "Test", email: "secretaire@test.com",
              password: "password", role_type: "secretaire", service_id: 1 
            }
          });
          
          // Create the Agent in Service A
          cy.request({
            method: 'POST',
            url: 'http://localhost:8000/api/agents',
            headers: { Authorization: `Bearer ${adminToken}` },
            body: { service_id: 1, matricule: "A01", nom: "Cypress", prenom: "Agent", telephone_principal: "..." }
          });
        });
    });  });
  
  
  // ==========================================================
  
  // TEST SCENARIO #1: Managing On-Call Periods
  // ==========================================================
  it('should allow a secretary to manage on-call periods', () => {
    // 1. Login as the Secretary and visit the dashboard
    cy.login('secretaire@test.com', 'password');
    cy.visit('http://localhost:3000/secretary/dashboard');
    cy.contains('h1', 'Tableau de Bord Secrétariat').should('be.visible');
  
    // 2. Intercept API calls and navigate to the Periods view
    cy.intercept('GET', '**/api/periodes-astreinte*').as('getPeriodes');
    cy.intercept('GET', '**/api/services*').as('getServices');
    cy.intercept('GET', '**/api/agents*').as('getAgents');
    cy.contains('button', "Périodes d'astreinte").click();
    cy.wait(['@getPeriodes', '@getServices', '@getAgents']);
    
    // 3. Verify the correct page has loaded
    cy.contains('h1', "Service A - Périodes d'Astreinte").should('be.visible');
    
    // 4. Test the Create functionality
    cy.contains('button', 'Nouvelle Période').click();
    cy.get('input#description').type('Test de Période Cypress');
    cy.get('select#service_id').select('1'); // Select service by value
    cy.get('input#date_debut').type('2025-12-01');
    cy.get('input#date_fin').type('2025-12-05');
    
    cy.intercept('POST', '**/api/periodes-astreinte').as('createPeriode');
    cy.contains('button', 'Enregistrer').click();
    cy.wait('@createPeriode');
  
    // 5. Verify the new period is in the table
    cy.get('table').contains('td', 'Test de Période Cypress').should('be.visible');
  });
  
  // ==========================================================
  // TEST SCENARIO #2: Managing Agent Unavailabilities
  // ==========================================================
  it('should allow a secretary to manage agent unavailabilities', () => {
    // 1. Login as the Secretary and visit the dashboard
    cy.login('secretaire@test.com', 'password');
    cy.visit('http://localhost:3000/secretary/dashboard');
    cy.contains('h1', 'Tableau de Bord Secrétariat').should('be.visible');
  
    // 2. Intercept API calls and navigate
    cy.intercept('GET', '**/api/agents*').as('getAgents');
    cy.intercept('GET', '**/api/indisponibilites-agents*').as('getUnavailabilities');
    cy.contains('button', 'Indisponibilité Agents').click();
    cy.wait(['@getAgents', '@getUnavailabilities']);
  
    // 3. Verify the correct page has loaded
    cy.contains('h1', 'Indisponibilité des Agents').should('be.visible');
  
    // 4. Create a new unavailability
    cy.contains('button', 'Nouvelle Indisponibilité').click();
     cy.contains('h2', 'Nouvelle Indisponibilité').should('be.visible');
  
     cy.get('form').within(() => {
        // Find the select by its label, which is more user-friendly
        cy.contains('label', 'Agent *').next('select').select('Agent Cypress');
        cy.contains('label', 'Type *').next('select').select('formation');
        cy.contains('label', 'Date de Début *').next('input').type('2025-11-10');
        cy.contains('label', 'Date de Fin *').next('input').type('2025-11-12');
        cy.contains('label', 'Motif *').next('textarea').type('Formation Cypress Test');
    
    cy.intercept('POST', '**/api/indisponibilites-agents').as('createUnavailability');
    cy.contains('button', 'Enregistrer').click();
  });
  
    cy.intercept('POST', '**/api/indisponibilites-agents').as('createUnavailability');
    cy.wait('@createUnavailability');
  
    // 5. Verify the creation
    cy.get('table').contains('td', 'Agent Cypress').should('be.visible');
    cy.get('table').contains('span', 'En attente').should('be.visible');
  
  
  });
  
  it('secretary_workflow', function() {});
});