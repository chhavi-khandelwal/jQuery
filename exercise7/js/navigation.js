$(document).ready(function() {
  $('#nav li').hover(
    function() {
      $(this).toggleClass('hover').children('ul').slideToggle();
  });
});