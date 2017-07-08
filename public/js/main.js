'use strict';

var chooseLogin = jQuery('#chooseLogin');
var chooseSignup = jQuery('#chooseSignup');
var loginSubmit = jQuery('#loginSubmit');
var signupSubmit = jQuery('#signupSubmit');
var resetSubmit = jQuery('#resetSubmit');
var resetSuccess = jQuery('#resetSuccess');

resetSuccess.hide();

chooseLogin.on('click', function () {
  window.location = 'signin.html';
});

chooseSignup.on('click', function () {
  window.location = 'signup.html';
});

loginSubmit.on('click', function () {
  window.location = 'userboard.html';
});

signupSubmit.on('click', function () {
  window.location = 'userboard.html';
});

resetSubmit.on('click', function () {
  resetSuccess.show();
});

$('#slide-submenu').on('click', function () {
  $(this).closest('.list-group').fadeOut('slide', function () {
    $('.mini-submenu').fadeIn();
  });
});

$('.mini-submenu').on('click', function () {
  $(this).next('.list-group').toggle('slide');
  $('.mini-submenu').hide();
});