/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, args) => {
    if (browser.family === 'chrome') {
      console.log('Adding --disable-dev-shm-usage...')
      args.push('--disable-dev-shm-usage')
    }
    return args
  })
}


require('@applitools/eyes-cypress')(module);  
