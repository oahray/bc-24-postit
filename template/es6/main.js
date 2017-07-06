let chooseLogin = $('#chooseLogin');
let chooseSignup = $('#chooseSignup');
let loginSubmit = $('#login-submit');
let signupSubmit = $('#signup-submit');
let resetSubmit = $('#reset-submit');

chooseLogin.on('click', () => {
  window.location = "signin.html";
});

chooseSignup.on('click', () => {
  window.location = "signup.html";
});

loginBtn.on('click', () => {
  window.location = "messageboard.html";
});

signupBtn.on('click', () => {
  window.location = "messageboard.html";
});

resetSubmit.on('click', () => {
  $('#reset-success').show();
});

