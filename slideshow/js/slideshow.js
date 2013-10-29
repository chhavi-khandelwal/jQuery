$(document).ready(function() {
  
  //Move the #slideshow element to the top of the body. 
  $('#slideshow').prependTo('body');
 
  $slideList = $('#slideshow li');
  $slideList.hide();
  $('<nav></nav>').appendTo('#slideshow');
  
  //Slideshow 
  var slideShow = function(slide_num, num_slides) {
    $slideList.eq(slide_num).fadeOut(1000, function(){ showImageNumber(slide_num, num_slides); });
    slide_num = (slide_num + 1) % num_slides;
    $slideList.eq(slide_num).delay(1000).fadeIn(1000, function(){ slideShow(slide_num, num_slides); });
  }
  
  //create a navigation area under the slideshow that shows how many images there are and which image you're currently 
  var showImageNumber = function(slide_num, num_slides) {
    $('#slideshow').find('nav').html("image: " + (slide_num + 1) + "/" + num_slides);
  }

  $slideList.eq(0).fadeIn(1000, function(){ slideShow(0, $slideList.length); });
  showImageNumber(0, $slideList.length);
});