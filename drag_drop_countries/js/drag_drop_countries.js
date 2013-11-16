$(document).ready(function() {
  var initialize = new init();
});

function init() {
  var listTransfer = new ListTransfer();
}

function ListTransfer() {
  
  //drags selected country
  this.dragCountry = function(country) {
    country.draggable({
      helper : 'clone',
      revert : 'invalid',
      drag: function(event, ui) {
        $('.countrylist').addClass('draggedTo');
        var listCountry = event.target;
        dropCountry(listCountry);
      }
    });
   } 
  function dropCountry(listCountry) {
    $('.draggedTo').droppable({
      drop: function() {
        $(listCountry).closest('ul').removeClass('draggedTo');
        if ($(this).hasClass('draggedTo')) {
          $(this).append(listCountry);
        }
      }
    });
  }
  this.dragCountry($('.dragAndDrop'));

  //drags country which cannot be dropped
  $('.doNotDrop').draggable({
    helper: "clone",
    revert: true,
    start: function(event) {
      $(event.target).closest('ul').addClass('onlyDrag');
    },
    stop: function(event) {
      $(event.target).closest('ul').removeClass('onlyDrag');
    }
  });
}