// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
// We name it 'login'.
Cypress.Commands.add('login', (email, password) => {
  // This command will perform an API request to your backend's login endpoint.
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/api/login', // Your backend login URL
    body: { email, password },
  })
  .then((response) => {
    // After the API call is successful, we get the token and user data from the response.
    const authToken = response.body.access_token;
    const user = response.body.user;

    // We then save this information to the browser's localStorage.
    // This makes the browser "think" that the user is logged in.
    window.localStorage.setItem('authToken', authToken);
    window.localStorage.setItem('user', JSON.stringify(user));
  });
});