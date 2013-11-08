$(document).ready(function() {
  var listTransfer = new ListTransfer();
});

function ListTransfer() {
  var listTransfer = this,
    transferredCountry = null,
    $addlist = $('#addlist');
  
  //drags selected country
  this.dragCountry = function(country) {
    country.draggable({
      helper: "clone",
      revert: false,
      start: function() {
        $(this).addClass('draggedFrom' + $(this).parent().attr('id'));
      }
    });
  }
  this.dragCountry($('.dragAndDrop'));
  
  //drops country when dragged over #removelist ul
  $('#removelist').droppable({
    drop: function(event, ui) {
      if ($(ui.draggable).hasClass('dragAndDrop') && $(ui.draggable).hasClass('draggedFromaddlist')) {
        $(ui.draggable).removeClass('draggedFromaddlist');
        transferredCountry = listTransfer.makeListItem(ui, this);
        listTransfer.dragCountry(transferredCountry);
        listTransfer.removeCountry(ui, $('#addlist li'));
      }
    } 
  });

  //drops country when dragged over #addlist ul
  $addlist.droppable({
    drop: function(event, ui) {
      if ($(ui.draggable).hasClass('dragAndDrop') && $(ui.draggable).hasClass('draggedFromremovelist')) {
        $(ui.draggable).removeClass('draggedFromremovelist');
        var transferredCountry = listTransfer.makeListItem(ui, this);
        listTransfer.dragCountry(transferredCountry);
        listTransfer.removeCountry(ui, $('#removelist li'));
      }
    } 
  });

  //drags country which cannot be dropped
  $('.doNotDrop').draggable({
    helper: "clone",
    revert: true,
    start: function() {
      $addlist.addClass('onlyDrag');
    },
    stop: function() {
      $addlist.removeClass('onlyDrag');
    }
  });

  //removes country from list once dropped to other list 
  this.removeCountry = function(ui, $list) {
    $list.each(function() {
      if(ui.helper.text() == $(this).text()) {
        $(this).remove();
      }
    });
  }
  
  //creates new list item
  this.makeListItem = function(ui, self) {
    var country = $("<li></li>").text(ui.draggable.text()).addClass('dragAndDrop').appendTo(self);
    return country;
  }
}