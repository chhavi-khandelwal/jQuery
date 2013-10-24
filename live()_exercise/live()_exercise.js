$(document).ready(function() {
  var $mainContainer = $('#main-container');
  
  // add a div to the stack with an incremental number on button click
  $('#add-button').bind('click', function() {
    var divCount = $mainContainer.find('div').length;
    $('<div>' + (divCount + 1) + '</div>').addClass('inner-container').appendTo($mainContainer);
  });
  
  //clicking any item in the stack should highlight that item
  $mainContainer.delegate('div:not(div:last)', 'click', function() {
    $(this).addClass('highlight');
  });
  
  // clicking the last item on the stack should remove that item from the stack
  $('#main-container').on('click', 'div:last-child', function() {
    $(this).remove();
  });
});