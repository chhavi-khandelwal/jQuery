$(document).ready(function() {
  $('#nav li').hover(
    function() {
      var $this = $(this);
      $this.toggleClass('hover');
      $this.children('ul').slideToggle();
  });
});