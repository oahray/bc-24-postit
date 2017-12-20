const {
  baseUrl, landing, signup, dashboard
} = require('../selectors');

module.exports = {
  'Signup link leads to signup page': (client) => {
    client
      .url(baseUrl)
      .waitForElementVisible(landing.joinText, 1000)
      .click(landing.signup)
      .waitForElementVisible(signup.formDiv, 1000)
      .assert.urlEquals(`${baseUrl}/signup`)
      .assert.containsText(signup.formHeader, 'Sign up')
      .pause(2000);
  },
  'Signup form displays error when username is invalid': (client) => {
    client
      .click(signup.submitButton)
      .setValue(signup.usernameInput, '??jon??')
      .click(signup.submitButton)
      .pause(1000)
      .setValue(signup.emailInput, 'jon@test.com')
      .click(signup.submitButton)
      .pause(1000)
      .setValue(signup.passwordInput, 'testpassword')
      .click(signup.submitButton)
      .pause(1000)
      .setValue(signup.confirmPassword, 'testpassword')
      .pause(1000)
      .click(signup.submitButton)
      .waitForElementVisible(signup.errorMessage, 1000)
      .assert.containsText(signup.errorMessage,
        'Only alphanumeric characters allowed')
      .pause(1000);
  },
  'Signup form displays error when username is taken': (client) => {
    client
      .refresh()
      .setValue(signup.usernameInput, 'jon')
      .pause(1000)
      .setValue(signup.emailInput, 'jon@test.com')
      .pause(1000)
      .setValue(signup.passwordInput, 'testpassword')
      .pause(1000)
      .setValue(signup.confirmPassword, 'testpassword')
      .pause(1000)
      .click(signup.submitButton)
      .waitForElementVisible(signup.errorMessage, 1000)
      .assert.containsText(signup.errorMessage,
        'Username already taken')
      .pause(1000);
  },
  'Signup form displays error when email is taken': (client) => {
    client
      .refresh()
      .setValue(signup.usernameInput, 'sammy')
      .pause(1000)
      .setValue(signup.emailInput, 'jonsnow@test.com')
      .pause(1000)
      .setValue(signup.passwordInput, 'testpassword')
      .pause(1000)
      .setValue(signup.confirmPassword, 'testpassword')
      .pause(1000)
      .click(signup.submitButton)
      .waitForElementVisible(signup.errorMessage, 1000)
      .assert.containsText(signup.errorMessage,
        'Email already taken')
      .pause(1000);
  },
  'Signup form displays error when passwords do not match': (client) => {
    client
      .refresh()
      .setValue(signup.usernameInput, 'sammy')
      .pause(1000)
      .setValue(signup.emailInput, 'sammy@example.com')
      .pause(1000)
      .setValue(signup.passwordInput, 'testpassword')
      .pause(1000)
      .setValue(signup.confirmPassword, 'testpasswordde')
      .pause(1000)
      .click(signup.submitButton)
      .waitForElementVisible(signup.errorMessage, 1000)
      .assert.containsText(signup.errorMessage,
        'Passwords do not match')
      .pause(1000);
  },
  'Signup form lets user sign up': (client) => {
    client
      .refresh()
      .setValue(signup.usernameInput, 'sammy')
      .pause(1000)
      .setValue(signup.emailInput, 'sammy@example.com')
      .pause(1000)
      .setValue(signup.passwordInput, 'testpassword')
      .pause(1000)
      .setValue(signup.confirmPassword, 'testpassword')
      .pause(1000)
      .click(signup.submitButton)
      .waitForElementVisible(dashboard.container, 1000)
      .assert.urlEquals(`${baseUrl}/`)
      .assert.elementPresent(dashboard.groupsContainer)
      .pause(1000)
      .end();
  }
};
