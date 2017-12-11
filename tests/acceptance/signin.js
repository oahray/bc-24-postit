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
      .assert.containsText(landing.welcomeHeader, 'Welcome to Postit')
      .pause(2000);
  },
  'Signin link leads to signin page': (client) => {
    client
      .waitForElementVisible(landing.joinText, 1000)
      .click(landing.signin)
      .waitForElementVisible(signin.formDiv, 1000)
      .assert.urlEquals(`${baseUrl}/signin`)
      .assert.containsText(signin.formHeader, 'Sign in')
      .pause(2000);
  },
  'Signin form displays error when login details are in correct': (client) => {
    client
      .setValue(signin.usernameInput, 'unknown')
      .pause(2000)
      .setValue(signin.passwordInput, 'testpassword')
      .pause(2000)
      .click(signin.submitButton)
      .waitForElementVisible(signin.errorMessage, 1000)
      .assert.containsText(signin.errorMessage, 'Username/Password is incorrect')
      .pause(1000);
  },
  'Signin form lets user sign in': (client) => {
    client
      .refresh()
      .click(signin.submitButton)
      .pause(1000)
      .setValue(signin.usernameInput, 'jon')
      .click(signin.submitButton)
      .pause(2000)
      .setValue(signin.passwordInput, 'testpassword')
      .pause(2000)
      .click(signin.submitButton)
      .waitForElementVisible(dashboard.container, 1000)
      .assert.urlEquals(`${baseUrl}/`)
      .assert.elementPresent(dashboard.groupsContainer)
      .pause(2000)
      // .get('javascript:localStorage.clear();')
      .refresh()
      .pause(2000)
      .end();
  }
};
