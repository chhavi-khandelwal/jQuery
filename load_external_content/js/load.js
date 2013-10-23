$(document).ready(function() {
  $('#blog h3').each(function() {
    var $this = $(this);

    //target div after the headline for each blog post 
    // store a reference to it on the headline element 
    $this.data('target_div', $('<div></div>').insertAfter($this));

    //Bind a click event to load the appropriate content from blog.html into the target div
    $this.bind('click', function(event) {

      event.preventDefault();
      
      var $blog_post = $(this);
      var href = $blog_post.find('a').attr('href');
      var id = "#" + href.split('#')[1];
      var $target_div = $blog_post.data('target_div');

      $target_div.load("blog.html " + id);
    });
  });
});