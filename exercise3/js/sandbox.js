$(document).ready(function() {
  
  //Add five new list items to the end of the unordered list #myList.
  $myList = $('#myList');
  for (var i = 0; i < 5; i++) {
    $myList.append($('<li>' + i + '</li>'));
  }

  //Remove the odd list items
  $('#myList li:odd').remove();

  $moduleDiv = $('div.module');
  //Add another h2 and another paragraph to the last div.module 
  $moduleDiv.last().append($('<h2> Heading2 </h2>'), $('<p> Paragraph Added </p>'));

  //Add another option to the select element; give the option the value "Wednesday" 
  $('select[name="day"]').append($('<option>', {
    value: "Wednesday",
    text: "Wednesday"
  }));

  //Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.
  $('<div class="module"></div>').insertAfter($($moduleDiv).last()).append($('img[alt="fruit"]').clone());

});