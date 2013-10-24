$(document).ready(function() {
  $('#blog h3').bind('click', function(e) {
    $blogPost = $(this);
    $blogPost.parent().siblings('li').find('p.excerpt:visible').slideUp();
    $blogPost.siblings('p.excerpt').slideDown();
    e.preventDefault();
  });
});