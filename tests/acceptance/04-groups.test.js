const {
  baseUrl, landing, signin, dashboard, sideNav,
  createGroup, groupPage, toastr, searchPage
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
      .pause(1000);
  },

  'Message form lets user send new message': (client) => {
    client
      .setValue(groupPage.messageInput, 'Hello all')
      .click(groupPage.prioritySelect.base)
      .waitForElementVisible(groupPage.prioritySelect.urgent, 1000)
      .click(groupPage.prioritySelect.urgent)
      .pause(1000)
      .click(groupPage.submit)
      .setValue(groupPage.messageInput,
        '*sigh* Hopefully, someone would read this someday')
      .pause(1000)
      .click(groupPage.submit)
      .pause(1000);
  },

  'Long group names throw error toasts when editing': (client) => {
    client
      .waitForElementVisible(groupPage.infoModal.trigger, 1000)
      .click(groupPage.infoModal.trigger)
      .waitForElementVisible(groupPage.infoModal.header, 1000)
      .assert.containsText(groupPage.infoModal.header, 'Edit group info')
      .clearValue(groupPage.infoModal.name)
      .setValue(groupPage.infoModal.name,
        'This new group name is just so unnecesarily long')
      .pause(1000)
      .clearValue(groupPage.infoModal.desc)
      .setValue(groupPage.infoModal.desc, 'This group has been renamed')
      .pause(1000)
      .click(groupPage.infoModal.save)
      .waitForElementVisible(toastr, 1000)
      .assert.containsText(toastr, 'Group name too long')
      .assert.containsText(groupPage.header, 'My new group')
      .pause(2000)
      .refresh();
  },

  'Long group descriptions throw error toasts when editing': (client) => {
    client
      .waitForElementVisible(groupPage.infoModal.trigger, 1000)
      .pause(2000)
      .click(groupPage.infoModal.trigger)
      .waitForElementVisible(groupPage.infoModal.header, 1000)
      .assert.containsText(groupPage.infoModal.header, 'Edit group info')
      .clearValue(groupPage.infoModal.name)
      .setValue(groupPage.infoModal.name, 'Renamed group')
      .pause(1000)
      .clearValue(groupPage.infoModal.desc)
      .setValue(groupPage.infoModal.desc, 'This group description is so long that it would take several wasted minutes to even read it, and, yeah... This group description is so long that it would take several wasted minutes to even read it')
      .pause(1000)
      .click(groupPage.infoModal.save)
      .waitForElementVisible(toastr, 1000)
      .assert.containsText(toastr, 'Group description too long')
      .assert.containsText(groupPage.header, 'My new group')
      .pause(2000)
      .refresh();
  },

  'User can edit group details': (client) => {
    client
      .waitForElementVisible(groupPage.infoModal.trigger, 1000)
      .pause(2000)
      .click(groupPage.infoModal.trigger)
      .waitForElementVisible(groupPage.infoModal.header, 1000)
      .assert.containsText(groupPage.infoModal.header, 'Edit group info')
      .clearValue(groupPage.infoModal.name)
      .setValue(groupPage.infoModal.name, 'Renamed group')
      .pause(1000)
      .clearValue(groupPage.infoModal.desc)
      .setValue(groupPage.infoModal.desc, 'This group has been renamed')
      .pause(3000)
      .click(groupPage.infoModal.save)
      .waitForElementVisible(toastr, 1000)
      .assert.containsText(groupPage.header, 'Renamed group')
      .pause(2000);
  },

  'Creator can add other users': (client) => {
    client
      .click(groupPage.goToSearch)
      .waitForElementVisible(searchPage.search, 1000)
      .setValue(searchPage.search, 'a')
      .pause(1000)
      .waitForElementVisible(searchPage.add.arya, 1000)
      .click(searchPage.add.arya)
      .waitForElementVisible(searchPage.confirm.arya, 1000)
      .pause(500)
      .click(searchPage.confirm.arya)
      .pause(1000)
      .refresh()
      .waitForElementVisible(searchPage.add.bran, 1000)
      .pause(500)
      .click(searchPage.add.bran)
      .waitForElementVisible(searchPage.confirm.bran, 1000)
      .click(searchPage.confirm.bran)
      .pause(1000)
      .click(searchPage.done)
      .waitForElementVisible(groupPage.mainDiv, 1000)
      .pause(2000);
  },

  'Group creator can remove other users': (client) => {
    client
      .waitForElementVisible(groupPage.userModal.trigger, 1000)
      .pause(1000)
      .click(groupPage.userModal.trigger)
      .waitForElementVisible(groupPage.userModal.header, 1000)
      .assert.containsText(groupPage.userModal.header, 'arya')
      .pause(1000)
      .click(groupPage.userModal.close)
      .waitForElementVisible(groupPage.removeModal.trigger, 1000)
      .pause(1000)
      .click(groupPage.removeModal.trigger)
      .waitForElementVisible(groupPage.removeModal.text, 1000)
      .pause(1000)
      .click(groupPage.removeModal.confirm)
      .pause(2000);
  },

  'Group creator can delete group': (client) => {
    client
      .click(groupPage.deleteModal.trigger)
      .waitForElementVisible(groupPage.deleteModal.text, 1000)
      .assert.containsText(groupPage.deleteModal.text, 'Sure you want to delete this group? This cannot be undone')
      .pause(1000)
      .click(groupPage.deleteModal.confirm)
      .waitForElementVisible(dashboard.container, 2000)
      .assert.urlEquals(`${baseUrl}/`)
      .pause(2000)
      .end();
  },
};
