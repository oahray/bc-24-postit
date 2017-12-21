const {
  baseUrl, landing, signin, dashboard
} = require('../selectors');

module.exports = {
  'Signin link leads to signin page': (client) => {
    client
      .url(baseUrl)
      .waitForElementVisible(landing.container, 1000)
      .assert.containsText(landing.welcomeHeader, 'Welcome to Postit')
      .pause(1000)
      .waitForElementVisible(landing.joinText, 1000)
      .click(landing.signin)
      .waitForElementVisible(signin.formDiv, 1000)
      .assert.urlEquals(`${baseUrl}/signin`)
      .assert.containsText(signin.formHeader, 'Sign in')
      .pause(1000);
  },
  'Signin form displays error when username is incorrect': (client) => {
    client
      .setValue(signin.usernameInput, 'unknown')
      .pause(1000)
      .setValue(signin.passwordInput, 'testpassword')
      .pause(1000)
      .click(signin.submitButton)
      .waitForElementVisible(signin.errorMessage, 1000)
      .assert.containsText(signin.errorMessage, 'Username/Password is incorrect')
      .pause(1000);
  },
  'Signin form displays error when password is incorrect': (client) => {
    client
      .refresh()
      .setValue(signin.usernameInput, 'sammy')
      .pause(1000)
      .setValue(signin.passwordInput, 'testpasswordddd')
      .pause(1000)
      .click(signin.submitButton)
      .waitForElementVisible(signin.errorMessage, 1000)
      .assert.containsText(signin.errorMessage,
        'Username/Password is incorrect')
      .pause(1000);
  },
  'Signin form lets user sign in': (client) => {
    client
      .refresh()
      .click(signin.submitButton)
      .pause(1000)
      .setValue(signin.usernameInput, 'sammy')
      .click(signin.submitButton)
      .pause(1000)
      .setValue(signin.passwordInput, 'testpassword')
      .pause(1000)
      .click(signin.submitButton)
      .waitForElementVisible(dashboard.container, 1000)
      .assert.urlEquals(`${baseUrl}/`)
      .assert.elementPresent(dashboard.groupsContainer)
      .pause(2000)
      .end();
  }
};
