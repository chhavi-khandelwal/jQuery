$(document).ready(function() {
  $('#blog h3').bind('click', function(e) {
    e.preventDefault();
    $this = $(this);
    $this.parent().siblings().find('p.excerpt:visible').slideUp();
    $this.siblings('p.excerpt').slideDown();
  });
});