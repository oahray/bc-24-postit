const {
  landing, signin, dashboard
} = require('../selectors');

const baseUrl = 'http://localhost:8000';

module.exports = {
  'Postit landing page': (client) => {
    client
      .url(baseUrl)
      .waitForElementVisible('body', 1000)
      .assert.title('Postit | Anytime')
      .waitForElementVisible(landing.container, 1000)
      .assert.containsText(landing.welcomeHeader, 'Welcome to Postit');
  },
  'Signin link leads to signin page': (client) => {
    client
      .waitForElementVisible(landing.joinText, 1000)
      .click(landing.signin)
      .waitForElementVisible(signin.formDiv, 1000)
      .assert.urlEquals(`${baseUrl}/signin`)
      .assert.containsText(signin.formHeader, 'Sign in');
  },
  'Signin form lets user sign in': (client) => {
    client
      .setValue(signin.usernameInput, 'test')
      .setValue(signin.passwordInput, 'mypassword')
      .click(signin.submitButton)
      .waitForElementVisible(dashboard.container, 1000)
      .assert.urlEquals(`${baseUrl}/`)
      .assert.elementPresent(dashboard.groupsContainer)
      .end();
  }
};
