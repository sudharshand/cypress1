/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const ntlmAuth = require("cypress-ntlm-auth/dist/plugin");

module.exports = (on, config) => {
  // Existing fix for Chrome browser disconnects between test specs, see: https://github.com/cypress-io/cypress/issues/7450
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--disable-gpu');
    }
    return launchOptions;
  });

  config = ntlmAuth.initNtlmAuth(config);
  return config;
}
