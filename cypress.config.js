const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  video: true,
  screenshotOnRunFailure: true,
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
