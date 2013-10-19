$(document).ready(function() {
	var blogHeadings = $('#blog h3');
  blogHeadings.bind('click', function(e) {
  	e.preventDefault();
	  blogHeadings.siblings('p.excerpt:visible').slideUp();
	  $(this).siblings('p.excerpt').slideDown();
  });
});