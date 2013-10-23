$(document).ready(function() {

  //Append a target div after the form that's inside the #specials element
  $('<div></div>').insertAfter('#specials form');
  
  $specials = $('#specials');
  $specialsDiv = $specials.find('div');
  var specialsCache = null;

  //Bind to the change event of the select element
  $specials.find('select').bind('change', function() {
    $specialsDiv.html("");
    if (specialsCache == null) {
      specialsCache = sendAjaxRequest();
    }
    var key = $(this).val();
    if(specialsCache[key]) {
      $specialsDiv.html(getSpecialsData(specialsCache, key));
    } 
  });
  
  //send an Ajax request to specials.json
  function sendAjaxRequest() {
    $.ajax({
      async: false,
      url: 'json/specials.json',
      type: 'get',
      dataType: 'json',
      success: function(data) {
        specialsCache = data;
      }
    });
    return specialsCache;
  }

  //get data from special json
  function getSpecialsData(data, key) {
    $('<h2></h2>').html(data[key].title)
                  .css('color', data[key].color)
                  .appendTo($specialsDiv);
    $('<p></p>').html(data[key].text)
                .css('color', data[key].color)
                .appendTo($specialsDiv);
    $('<img src=' + data[key].image + ">" + '</img>').appendTo($specialsDiv);
  }
  
  //remove the submit button from the form  
  $specials.find('form').find('li.buttons').remove();

});