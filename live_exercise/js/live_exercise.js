$(document).ready(function() {
  var $mainContainer = $('#main-container');
  var innerDivCount = 0;

  // add a div to the stack with an incremental number on button click
  $('#add-button').bind('click', function() {
    innerDivCount++;
    $('<div class="innerDiv">' + innerDivCount + '</div>').addClass('inner-container').prependTo($mainContainer);
  });
  
  //clicking any item in the stack should highlight that item
  $mainContainer.delegate('div.innerDiv:not(div.innerDiv:first)', 'click', function() {
    $(this).addClass('highlight');
  });
  
  // clicking the last item on the stack should remove that item from the stack
  $mainContainer.delegate('div.innerDiv:first-child', 'click', function() {
    $(this).remove();
    innerDivCount--;
  });
});