$(document).ready(function() {
  var searchForm = $('#search');
  var searchInput = searchForm.find($('input[name="q"]'));

  //Remove the label element 
  
  var searchLabel = searchForm.find($('label[for="q"]')).remove().text();

  //Set the value of the search input to the text of the label element 
  searchInput.val(searchLabel)

  //Add a class of "hint" to the search input 
    .addClass("hint")

  //Bind a focus event to the search input that removes the hint text and the "hint" class
    .bind('focus', function() {
      $(this).removeClass("hint");
      if ($(this).val() == searchLabel)
        $(this).val("");
    })
    
  //Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered
    .bind('blur', function() {
      $(this).addClass("hint");
      if (!$(this).val().trim())
        $(this).val(searchLabel);
    });
});