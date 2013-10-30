$(document).ready(function() {

  //Append a target div after the form that's inside the #specials element
  $specialsDiv =  $('<div></div>').insertAfter('#specials form')
    .append('<h2 class="specialContainer"></h2> <p class="specialContainer"></p> <img class="specialContainer"/>');
  
  $specials = $('#specials');
  var specialsCache = null;

  //Bind to the change event of the select element
  $specials.find('select[name="day"]').bind('change', function() {
    if (specialsCache == null) {
      sendAjaxRequest();
    }
    var key = $(this).val();
    if(specialsCache[key]) {
      getSpecialsData(key);
    } 
  });
  
  //send an Ajax request to specials.json
  function sendAjaxRequest() {
    $.ajax({
      async: false,
      url: 'json/specials.json',
      dataType: 'json',
      success: function(data) {
        specialsCache = data;
      }
    });
  }

  //get data from special json
  function getSpecialsData(key) {
    $specialsDiv.children('h2.specialContainer').html(specialsCache[key].title)
      .css('color', specialsCache[key].color).end()
      .children('p.specialContainer').html(specialsCache[key].text)
      .css('color', specialsCache[key].color).end()
      .children('img.specialContainer').attr('src', specialsCache[key].image).end();
  }
  
  //remove the submit button from the form  
  $specials.find('form').find('input.input_submit').remove();

});