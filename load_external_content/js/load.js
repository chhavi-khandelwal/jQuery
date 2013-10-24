$(document).ready(function() {
  $('#blog h3').each(function(index) {
    $blog_post = $(this);

    //target div after the headline for each blog post 
    var id = "target" + index;
    var $target = $('<div id=' + id + ">" + '</div>').insertAfter($blog_post);

    // store a reference to it on the headline element
    $blog_post.data('target_id', id);

  }).bind('click', function(event) {     //Bind a click event to load the appropriate content from blog.html into the target div  

      var $blog_post = $(this);
      var href = $blog_post.find('a').attr('href');
      var id = "#" + href.split('#')[1];
      var $target_div = $blog_post.siblings($('#' + $blog_post.data('target_id')));

      $target_div.load("blog.html " + id);

      event.preventDefault();
    });
});