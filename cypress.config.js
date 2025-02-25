import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://employee-management-git-main-fmsena1s-projects.vercel.app/",
    testIsolation: false
  },
});
