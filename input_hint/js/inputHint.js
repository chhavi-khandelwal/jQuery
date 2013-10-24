$(document).ready(function() {
  var searchForm = $('#search');
  var searchInput = searchForm.find($('input[type="text"]'));

  //Remove the label element 
  
  var searchLabel = searchForm.find($('label[for="q"]')).remove().text();
  
  searchInput.val(searchLabel)  //Set the value of the search input to the text of the label element 
    
    .addClass("hint")  //Add a class of "hint" to the search input 

    .bind('focus', function() {   //Bind a focus event to the search input that removes the hint text and the "hint" class
      $(this).removeClass("hint")
      if ($(this).val() == searchLabel)
        $(this).val("");
    }) 

    .bind('blur', function() {    //Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered
      $(this).addClass("hint")
      if ($(this).val() == "")
        $(this).val(searchLabel);   
    });
});