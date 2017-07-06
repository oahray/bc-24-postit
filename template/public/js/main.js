'use strict';

var chooseLogin = $('#chooseLogin');
var chooseSignup = $('#chooseSignup');
var loginSubmit = $('#login-submit');
var signupSubmit = $('#signup-submit');
var resetSubmit = $('#reset-submit');
var resetSuccess = $('#reset-success');

resetSuccess.hide();

chooseLogin.on('click', function () {
  window.location = "signin.html";
});

chooseSignup.on('click', function () {
  window.location = "signup.html";
});

loginBtn.on('click', function () {
  window.location = "messageboard.html";
});

signupBtn.on('click', function () {
  window.location = "messageboard.html";
});

resetSubmit.on('click', function () {
  resetSuccess.show();
});