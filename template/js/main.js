$(document).ready(function () {
  $('.carousel').carousel();
  // Initialize collapse button
  $('.button-collapse').sideNav();
  // the "href" attribute of the modal trigger must specify
  // the modal ID that wants to be triggered
  $('.modal').modal();
  // Initialize material select
  $('select').material_select();
});

setInterval(function () { $('.carousel').carousel('next'); }, 5000);
