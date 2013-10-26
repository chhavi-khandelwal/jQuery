$(document).ready(function() {

  //Append a target div after the form that's inside the #specials element
  $specialsDiv =  $('<div></div>').insertAfter('#specials form')
    .append('<h2></h2> <p></p> <img>');
  
  $specials = $('#specials');
  var specialsCache = null;

  //Bind to the change event of the select element
  $specials.find('select[name="day"]').bind('change', function() {
    if (specialsCache == null) {
      specialsCache = sendAjaxRequest();
    }
    var key = $(this).val();
    if(specialsCache[key]) {
      getSpecialsData(specialsCache, key);
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
    $specialsDiv.children('h2').html(data[key].title)
      .css('color', data[key].color).end()
      .children('p').html(data[key].text)
      .css('color', data[key].color).end()
      .children('img').attr('src', data[key].image).end();
  }
  
  //remove the submit button from the form  
  $specials.find('form').find('li.buttons').remove();

});