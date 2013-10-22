$(document).ready(function() {
  
  //Move the #slideshow element to the top of the body. 
  $('#slideshow').prependTo('body');
 
  $slideList = $('#slideshow li');
  $slideList.hide();
  $('<nav></nav>').appendTo('#slideshow');
  var listLength = $slideList.length;
  var i = 0;
  
  //Slideshow 
  var slideShow = function() {
    if ($slideList.eq(i).length) {
      i++;
      $slideList.eq(i-1).fadeOut(1000, showImageNumber);
      $slideList.eq(i).delay(1000).fadeIn(1000, slideShow);
      
      //end of the list, start again at the beginning.
      if (i == listLength) {
        $slideList.eq(i).fadeOut(1000, showImageNumber);
        i = 0;
        $slideList.eq(i).delay(1000).fadeIn(1000, slideShow);
      }
    }
  }
  
  //create a navigation area under the slideshow that shows how many images there are and which image you're currently 
  var showImageNumber = function() {
    $('#slideshow').find('nav').html("image: " + (i+1) + "/" + listLength);
  }

  $slideList.eq(i).fadeIn(1000, slideShow);
  showImageNumber();
});