$(document).ready(function() {

  //slect all div elements that have a class of "module"
  var moduleDiv = [];
  $('div.module').each(function() {
    moduleDiv.push($(this).attr('id'));
  });
  alert('div with classname module: ' + moduleDiv.join(', '));

  //three selectors that you could use to get the third item in the #myList unordered list.
  alert("1. " + $("#myList li:nth-child(3)").html());
  alert("2.Best Method: " + $('#myListItem').html()); //best method since id selector is the most efficient
  alert("3. " + $("#myList li:eq(2)").html());

  //Select the label for the search input using an attribute selector
  alert("search label: " + $('label[for="q"]').html());

  //Figure out how many elements on the page are hidden
  alert("Hidden Elements(length): " + $('*:hidden').length);

  //Figure out how many image elements on the page have an alt attribute.
  alert("No. of images with alt tag: " + $('img[alt]').length);

  //Select all of the odd table rows in the table body.
  var oddRows = [];
  $('tbody tr:odd').each(function() {
    oddRows.push($(this).html());
  });
  alert("odd rows" + oddRows.join("\n"));
});