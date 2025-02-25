import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 60000,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://employee-management-git-main-fmsena1s-projects.vercel.app/",
    testIsolation: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
  },
});
