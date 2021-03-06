$(document).ready(function() {
  $('#blog h3').each(function(index) {
    var $blog_post = $(this);

    //target div after the headline for each blog post 
    var id = "blog_load_target" + index;
   
    $blog_post.after($('<div id=' + id + '></div>')).data('blog_load_target_id', id);

    // store a reference to it on the headline element

  }).bind('click', function(event) {     //Bind a click event to load the appropriate content from blog.html into the target div  
      
      event.preventDefault();

      var $blog_post = $(this);
      var href = $blog_post.children($("a[href*='blog.html#post']")).attr('href');
      var id = "#" + href.split('#')[1];
      var $target_div = $blog_post.siblings($('#' + $blog_post.data('blog_load_target_id')));

      $target_div.load("blog.html " + id);

    });
});