function ListItem(listItem) {
  this.name = listItem.name;
  this.priorityOrder = listItem.priority_order || Number.MAX_VALUE;
  
  //creates dom for list item of an unoredered list
  this.createDOMForListItem = function() {
    return $('<li/>', { 'data-priority-order': this.priorityOrder }).html($('<a/>').text(this.name));
  }
  this.DOMListItem = this.createDOMForListItem();
}