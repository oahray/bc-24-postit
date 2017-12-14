const {
  baseUrl, landing, signin, signup, forgot
} = require('../selectors');

module.exports = {
  'Postit landing page': (client) => {
    client
      .url(baseUrl)
      .waitForElementVisible('body', 1000)
      .assert.title('Postit | Anytime')
      .waitForElementVisible(landing.container, 1000)
      .assert.containsText(landing.welcomeHeader, 'Welcome to Postit')
      .pause(1000);
  },
  'Signup link leads to signup page': (client) => {
    client
      .waitForElementVisible(landing.joinText, 1000)
      .click(landing.signup)
      .waitForElementVisible(signup.formDiv, 1000)
      .assert.urlEquals(`${baseUrl}/signup`)
      .assert.containsText(signup.formHeader, 'Sign up')
      .pause(1000);
  },
  'Nav Brand link leads back to landing page': (client) => {
    client
      .click(landing.nav.brand)
      .waitForElementVisible(landing.container, 1000)
      .assert.containsText(landing.welcomeHeader, 'Welcome to Postit')
      .pause(1000);
  },
  'Signin link leads to signin page': (client) => {
    client
      .waitForElementVisible(landing.joinText, 1000)
      .click(landing.signin)
      .waitForElementVisible(signin.formDiv, 1000)
      .assert.urlEquals(`${baseUrl}/signin`)
      .assert.containsText(signin.formHeader, 'Sign in')
      .pause(1000);
  },
  'Recover password link leads to recovery page': (client) => {
    client
      .waitForElementVisible(signin.formDiv, 1000)
      .click(signin.forgotPassword)
      .waitForElementVisible(forgot.header, 1000)
      .assert.urlEquals(`${baseUrl}/forgotpassword`)
      .assert.containsText(forgot.header, 'Forgot Password')
      .pause(1000)
      .click(landing.nav.brand)
      .waitForElementVisible(landing.container, 1000);
  },
  'Docs link leads to documentation page': (client) => {
    client
      .click(landing.nav.docs)
      .pause(2000)
      // .waitForElementVisible(landing.container, 1000)
      .end();
  }
};
