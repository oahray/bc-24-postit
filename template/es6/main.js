let chooseLogin = jQuery('#chooseLogin');
let chooseSignup = jQuery('#chooseSignup');
let loginSubmit = jQuery('#loginSubmit');
let signupSubmit = jQuery('#signupSubmit');
let resetSubmit = jQuery('#resetSubmit');
let resetSuccess = jQuery('#resetSuccess');

resetSuccess.hide();

chooseLogin.on('click', () => {
  window.location = "signin.html";
});

chooseSignup.on('click', () => {
  window.location = "signup.html";
});

loginSubmit.on('click', () => {
  window.location = "userboard.html";
});

signupSubmit.on('click', () => {
  window.location = "userboard.html";
});

resetSubmit.on('click', () => {
  resetSuccess.show();
});

$('#slide-submenu').on('click', function() {			        
  $(this).closest('.list-group').fadeOut('slide',function(){
    $('.mini-submenu').fadeIn();	
  });        
});

$('.mini-submenu').on('click',function(){		
  $(this).next('.list-group').toggle('slide');
  $('.mini-submenu').hide();
})