$(document).ready(function() {
  $('#nav li').hover(
    function() {
      $this = $(this);
      $this.toggleClass('hover');
      $this.children('ul').slideToggle();
  });
});