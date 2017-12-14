const {
  baseUrl, landing, signin, dashboard,
  sideNav, createGroup, groupPage
} = require('../selectors');

module.exports = {
  'New group link leads to new page': (client) => {
    client
      .url(baseUrl)
      .waitForElementVisible(landing.container, 1000)
      .click(landing.signin)
      .waitForElementVisible(signin.formDiv, 1000)
      .assert.urlEquals(`${baseUrl}/signin`)
      .assert.containsText(signin.formHeader, 'Sign in')
      .pause(1000)
      .setValue(signin.usernameInput, 'jon')
      .pause(1000)
      .setValue(signin.passwordInput, 'testpassword')
      .pause(1000)
      .click(signin.submitButton)
      .waitForElementVisible(dashboard.container, 1000)
      .assert.urlEquals(`${baseUrl}/`)
      .assert.elementPresent(dashboard.groupsContainer)
      .pause(1000)
      .click(sideNav.newGroup)
      .assert.urlEquals(`${baseUrl}/groups/new`)
      .assert.containsText(createGroup.header, 'Create New Group');
  },
  'Create Group form lets user create new group': (client) => {
    client
      .click(createGroup.submit)
      .setValue(createGroup.nameInput, 'My new group')
      .pause(1000)
      .setValue(createGroup.descInput, 'This group is for test purposes.')
      .pause(1000)
      .setValue(createGroup.typeSelect, 'private')
      .pause(1000)
      .click(createGroup.submit)
      .waitForElementVisible(groupPage.mainDiv, 1000)
      .assert.containsText(groupPage.header, 'My new group')
      .pause(1000)
      .end();
  }
};
