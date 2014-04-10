var ListItem = function(listItem) {
  this.initialize(listItem);
}

ListItem.prototype = {
  initialize: function(listItem) {
    this.name = listItem.name;
    this.priorityOrder = listItem.priority_order || Number.MAX_VALUE;
    this.DOMListItem = this.createDOMForListItem();
  },
  
  //creates dom for list item of an unoredered list
  createDOMForListItem: function() {
    return $('<li/>', { 'data-priority-order': this.priorityOrder, class: 'list-item' }).html($('<a/>').text(this.name));
  }
}