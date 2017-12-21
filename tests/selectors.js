module.exports = {
  baseUrl: 'http://localhost:8000',
  toastr: '#toast-container',
  materialOverlay: '#materialbox-overlay',

  landing: {
    container: '.guest-home',
    nav: {
      brand: '.navbar-div > div > nav > div > a.brand-logo',
      signin: '#root > div > div.main > div:nth-child(2) > div > div.guest-home-text > a:nth-child(3)',
      signup: '#root > div > div.main > div:nth-child(2) > div > div.guest-home-text > a:nth-child(2)',
      docs: '#root > div > div > div.navbar-div > div > nav > div > ul > li.my-list-item.docs-link > a'
    },
    welcomeHeader: '.guest-home-header',
    joinText: '#root > div > div.main > div:nth-child(2) > div > div.guest-home-text',
    signin: '#landing-signin',
    signup: '#landing-signup'
  },

  signin: {
    formDiv: '#root > div > div.main > div:nth-child(2) > div > form',
    formHeader: '#root > div > div.main > div:nth-child(2) > div > form > h4',
    usernameInput: '#signin-username',
    passwordInput: '#signin-password',
    submitButton: '#root > div > div.main > div:nth-child(2) > div > form > div:nth-child(6) > button',
    errorMessage: '#root > div > div.main > div:nth-child(2) > div > form > div.form-error-message.center.red-text.bold > h6',
    forgotPassword: '#root > div > div.main > div:nth-child(2) > div > form > div:nth-child(7) > p:nth-child(1) > a',
    signup: '#root > div > div.main > div:nth-child(2) > div > form > div:nth-child(7) > p:nth-child(2) > a'
  },

  signup: {
    formDiv: '#root > div > div.main > div:nth-child(2) > div > div',
    formHeader: '#root > div > div.main > div:nth-child(2) > div > div > form > h4',
    usernameInput: '#signup-username',
    emailInput: '#signup-email',
    passwordInput: '#signup-password1',
    confirmPassword: '#signup-password2',
    errorMessage: '#root > div > div.main > div:nth-child(2) > div > div > form > div.form-error.center.red-text.bold > h6',
    submitButton: '#root > div > div.main > div:nth-child(2) > div > div > form > div:nth-child(7) > button',
    signin: '#root > div > div.main > div:nth-child(2) > div > div > form > div.main-text-color > p > a'
  },

  forgot: {
    header: '#root > div > div.main > div:nth-child(2) > form > h5',
    input: '#root > div > div > div:nth-child(2) > form > div > input',
    submit: '#request-reset-btn',
    message: '#root > div > div > div:nth-child(2) > form > div > div:nth-child(3) > div > p'
  },

  dashboard: {
    container: '.user-home',
    groupsContainer: '.user-home-content'
  },

  sideNav: {
    newGroup: '#side-nav > li:nth-child(2) > a',
  },

  searchPage: {
    search: '#search',
    done: '#root > div > div > div.main-container > div > div.search-results-container.col.s12.m9 > div.col.s12.center > div:nth-child(2) > a',
    add: {
      arya: '#root > div > div > div.main-container > div > div.search-results-container.col.s12.m9 > div.search-list-container.col.s10.offset-s1 > ul > li:nth-child(1) > span.secondary-content > div > a > i',
      bran: '#root > div > div > div.main-container > div > div.search-results-container.col.s12.m9 > div.search-list-container.col.s10.offset-s1 > ul > li > span.secondary-content > div > a > i'
    },
    confirm: {
      arya: '#add-user12 > div.modal-footer > span.right > a',
      bran: '#add-user13 > div.modal-footer > span.right > a'
    }
  },

  userList: {
    toggle: '#group-user-list > li > div.collapsible-header.main-background-color.white-text.valign-wrapper.group-users-header'
  },

  createGroup: {
    header: '#root > div > div > div.main-container > div > h5',
    nameInput: '#new-group-name',
    descInput: '#new-group-desc',
    typeSelect: '#new-group-type',
    submit: '#root > div > div > div.main-container > div > div > form > div.center > button'
  },

  groupPage: {
    mainDiv: '.group-page',
    header: '#root > div > div > div.main-container > div > div.col.s12.z-depth-2.messages-section > h5',
    messageInput: '#textarea1',
    prioritySelect: {
      base: '.select-wrapper',
      normal: '.dropdown-content li:nth-child(1)',
      urgent: '.dropdown-content li:nth-child(2)',
      critical: '.dropdown-content li:nth-child(3)'
    },
    submit: '#message-button > i',
    goToSearch: '#root > div > div > div.main-container > div > div:nth-child(2) > div.col.s12.m3.group-info-col > ul > li.center.invite-users.pointer > a',
    infoModal: {
      trigger: '#open-editGroup1 > i',
      header: '#editGroup1 > div > h5',
      name: '#group-name-input',
      desc: '#group-desc-input',
      type: '#editGroup1 > div > div > form > div.row > div > div > input',
      cancel: '#editGroup1 > div > div > form > div.modal-footer > span.left > a',
      save: '#save-group-info > a'
    },
    deleteModal: {
      trigger: '#root > div > div > div.main-container > div > div:nth-child(2) > div.col.s12.m3.group-info-col > ul > li.group-info-ul > div.main-text-color.page-header > span > span.pointer.right > div > a > i',
      text: '#deleteGroupModal > div.modal-content > h5',
      confirm: '#deleteGroupModal > div.modal-footer > span.right > a',
      cancel: '#deleteGroupModal > div.modal-footer > span.left > a'
    },
    removeModal: {
      trigger: '#group-user-list > li > div.white.collapsible-body > ul > li:nth-child(3) > span.secondary-content.pointer > div > a > i > small',
      text: '#remove-bran > div.modal-content > h5',
      confirm: '#remove-bran > div.modal-footer > span.right > a'
    },
    userModal: {
      trigger: '#group-user-list > li > div.white.collapsible-body > ul > li:nth-child(2) > span.col.s6 > div > a',
      header: '#user12-modal > div.modal-content.center > h3',
      img: '#user12-modal > div.modal-content.center > div > div > div > img',
      close: '#user12-modal > div.modal-footer.center > a'
    }
  }
};
