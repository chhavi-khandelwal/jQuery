$(document).ready(function() {
  $('#nav li').hover(
    function() {
      var $this = $(this);
      $this.addClass('hover');
      $this.children('ul').slideDown();
    },
    function() {
      var $this = $(this);
      $this.removeClass('hover');
      $this.children('ul:visible').slideUp();
  });
});