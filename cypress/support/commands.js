
Cypress.Commands.add('login', (email, password) => {
  // Clear old session data first
  cy.session([email, password], () => {
    cy.request('POST', 'http://localhost:8000/api/login', { email, password })
      .then((response) => {
        // This is a more robust way to set localStorage for the test
        window.localStorage.setItem('authToken', response.body.access_token);
        window.localStorage.setItem('user', JSON.stringify(response.body.user));
      });
  }, {
    cacheAcrossSpecs: true // This makes the login persist between test files!
  });
});