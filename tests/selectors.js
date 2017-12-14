module.exports = {
  baseUrl: 'http://localhost:8000',

  // baseUrl: 'https://postit-ray.herokuapp.com',

  landing: {
    container: '.guest-home',
    nav: {
      brand: '.navbar-div > div > nav > div > a.brand-logo',
      signin: '.navbar-div > div > nav > div > ul > li:nth-child(1) > a',
      signup: '.navbar-div > div > nav > div > ul > li:nth-child(2) > a',
      docs: '#root > div > div > div.navbar-div > div > nav > div > ul > li.my-list-item.docs-link > a'
    },
    welcomeHeader: '.guest-home-header',
    joinText: '.guest-home-text',
    signin: '.guest-home-text a:nth-child(3)',
    signup: '.guest-home-text > a:nth-child(2)'
  },

  signin: {
    formDiv: '#root > div > div > div:nth-child(2) > div',
    formHeader: '#root > div > div > div:nth-child(2) > div > form > h4',
    usernameInput: '#signin-username',
    passwordInput: '#signin-password',
    submitButton: '#root > div > div > div:nth-child(2) > div > form > div:nth-child(6) > button',
    errorMessage: '#root > div > div > div:nth-child(2) > div > form > div.form-error-message.center.red-text.bold > h6',
    forgotPassword: '#root > div > div > div:nth-child(2) > div > form > div:nth-child(7) > p:nth-child(1) > a',
    signup: '#root > div > div > div:nth-child(2) > div > form > div:nth-child(7) > p:nth-child(2) > a'
  },

  signup: {
    formDiv: '.signup-form',
    formHeader: '.signup-form > h4',
    usernameInput: '#signup-username',
    emailInput: '#signup-email',
    passwordInput: '#signup-password1',
    confirmPassword: '#signup-password2',
    errorMessage: '#root > div > div > div:nth-child(2) > div > div > form > div.form-error.center.red-text.bold > h6',
    submitButton: '#root > div > div > div:nth-child(2) > div > div > form > div:nth-child(7) > button',
    signin: '#root > div > div > div:nth-child(2) > div > div > form > div.main-text-color > p > a'
  },

  forgot: {
    header: '#root > div > div > div:nth-child(2) > form > h5',
    input: '#root > div > div > div:nth-child(2) > form > div > input',
    submit: '#request-reset-btn',
    message: '#root > div > div > div:nth-child(2) > form > div > div:nth-child(3) > div > p'
  },

  dashboard: {
    container: '.user-home',
    groupsContainer: '.user-home-content'
  },

  sideNav: {
    newGroup: '#side-nav > li:nth-child(3) > a'
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
    header: '#root > div > div > div.main-container > div > div.col.s12.z-depth-2.messages-section > h5'
  }
};
