const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // React app URL
    env: {
      apiUrl: 'http://127.0.0.1:8000/api' // Laravel backend URL
    },
  },
});
