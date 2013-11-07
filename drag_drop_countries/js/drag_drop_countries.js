$(document).ready(function() {
  var listTransfer = new ListTransfer();
});

function ListTransfer() {
  var listTransfer = this,
    transferredCountry = null;
  
  //highlights selected droppable country  
  $('#removelist, #addlist').delegate('li', 'click', function() {
    $this = $(this);
    if ($this.hasClass('dragAndDrop')) {
      $this.addClass('selectedCountry');
    }
  })
  
  //drags selected country
  this.dragCountry = function(country) {
    country.draggable({
      appendTo: "body",
      helper: "clone",
      revert: false,
      start: function() {
        $(this).removeClass('selectedCountry');
      },
      stop: function(event, ui) {
        listTransfer.removeCountry(ui, this);
      }
    });
  }
  this.dragCountry($('.dragAndDrop'));
  
  //drops country when dragged over #removelist ul
  $('#removelist').droppable({
    drop: function(event, ui) {
      if ($(ui.draggable).hasClass('dragAndDrop')) {
        transferredCountry = listTransfer.makeListItem(ui, this);
      }
      listTransfer.dragCountry($('#removelist li'));
    } 
  });

  //drops country when dragged over #addlist ul
  $('#addlist').droppable({
    drop: function(event, ui) {
      var country = listTransfer.makeListItem(ui, this);
      transferredCountry = country.addClass('dragAndDrop');
      listTransfer.dragCountry(transferredCountry);
    } 
  });
  
  //drags country which cannot be dropped
  $('.doNotDrop').draggable({
    helper: "clone",
    revert: true,
    start: function() {
      $('#addlist').addClass('onlyDrag');
    },
    stop: function() {
      $('#addlist').removeClass('onlyDrag');
    }
  });

  //removes country from list once dropped to other list 
  this.removeCountry = function(ui, that) {
    if (transferredCountry) {
      if(transferredCountry.text() == ui.helper.text()) {
        that.remove();
      }
    }
  }
  
  //creates new list item
  this.makeListItem = function(ui, self) {
    var country = $("<li></li>").text(ui.draggable.text()).appendTo(self);
    return country;
  }
}