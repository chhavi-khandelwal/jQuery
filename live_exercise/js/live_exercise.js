$(document).ready(function() {
  var $mainContainer = $('#main-container');
  var i = 0;

  // add a div to the stack with an incremental number on button click
  $('#add-button').bind('click', function() {
    i++;
    $('<div class="inner-div">' + i + '</div>').addClass('inner-container').prependTo($mainContainer);
  });
  
  //clicking any item in the stack should highlight that item
  $mainContainer.delegate('div.inner-div:not(div.inner-div:first)', 'click', function() {
    $(this).addClass('highlight');
  });
  
  // clicking the last item on the stack should remove that item from the stack
  $mainContainer.on('click', 'div.inner-div:first-child', function() {
    $(this).remove();
    i--;
  });
});