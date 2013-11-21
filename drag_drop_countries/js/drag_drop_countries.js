$(document).ready(function() {
  
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

  //drags selected country
  $('.dragAndDrop').draggable({
    helper : 'clone',
    revert : 'invalid',
    drag: function(event, ui) {
      $('.countrylist').addClass('draggedTo');
      var listCountry = event.target;
      var listTransfer = new ListTransfer();
      listTransfer.dropCountry(listCountry);
    }
  });
});

//transfers country to the other list
function ListTransfer() {
  this.dropCountry = function(listCountry) {
    $('.draggedTo').droppable({
      drop: function() {
        $(listCountry).closest('ul').removeClass('draggedTo');
        if ($(this).hasClass('draggedTo')) {
          $(this).append(listCountry);
        }
      }
    });
  }
}