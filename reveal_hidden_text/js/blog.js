$(document).ready(function() {

  $('#blog h3').bind('click', function(e) {
    e.preventDefault();
    $('#blog p.excerpt:visible').slideUp();
    $(this).siblings('p.excerpt').slideDown();
  });
});