function UnorderedList(list) {
  this.initialCount = list.initial_count;
  this.items = list.items;
  this.sortedListItems = [];
  this.DOMList = null;
  var unorderedList = this;
  var nestedListIds = ['listone', 'listtwo'];
  
  //creates dom for nested lists inside the main list
  this.createDOMForNestedUnorderedList = function(listId) {
    return $('<ul/>', {id: listId});
  }
  
  //create dom for unordered list
  this.createDOMForUnorderedList = function() {
    var nestedLists = [];
    for (var i = 0, len = nestedListIds.length; i < len; i++) {
      nestedLists.push(this.createDOMForNestedUnorderedList(nestedListIds[i]));
    }
    var $nestedListsContainer = $('<div/>', {class: 'nested-container'}).append(nestedLists);
    this.DOMList = $('<ul/>', { 'data-initial-count': this.initialCount, class: 'two-column-sort' }).html($('<a/>', { id: 'head'}).text('UnorderedList-1'))
      .append($nestedListsContainer);
    $nestedListsContainer.hide();  
  }
  
  //sorts items on the basis of name or priority data
  this.sortListItems = function(sortData) {
    this.sortedListItems.sort(compare);
    function compare(item1, item2) {
      var sortData1 = item1[sortData], sortData2 = item2[sortData];
      if (sortData1 < sortData2) {
        return -1;
      } else if (sortData1 > sortData2) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  
  //creates list item objects
  this.createListItems = function() {
    var listItemsCollection = [];
    for (var i in this.items) {
      listItemsCollection.push(new ListItem(this.items[i]));
    }
    this.sortedListItems = listItemsCollection;
  }
  
  //displays listitems when unordered list is clicked or see-less link is clicked
  this.appendListItems = function(listItemsLength, listCondition) {
    var $listOne = this.DOMList.find($('#listone')).html('');
    var $listTwo = this.DOMList.find($('#listtwo')).html('');
    for (var i = 0, len = listItemsLength; i < len; i++) {  
      if (i < listCondition) {
        this.sortedListItems[i].DOMListItem.appendTo($listOne);          
      }
      else {
        this.sortedListItems[i].DOMListItem.appendTo($listTwo);          
      }
    }
  }
  
  //displays list items by toggling the nested lists
  this.displayAndAppendListItems = function() {
    unorderedList.displayItemsOnAlphabeticOrderBasis();
    unorderedList.DOMList.find('.nested-container').slideToggle();
  }
  
  //displays items on priority basis
  this.displayItemsOnPriorityBasis = function() {
    unorderedList.sortListItems('priorityOrder');
    $('#See-More').remove();
    var listItemsLength = unorderedList.sortedListItems.length;
    var listCondition = listItemsLength / 2;
    unorderedList.appendListItems(listItemsLength, listCondition);
    unorderedList.createLastLink('See-Less');
  }
  
  //displays items on alphabetic order basis
  this.displayItemsOnAlphabeticOrderBasis = function() {
    unorderedList.sortListItems('name');
    var listItemsLength = 2 * unorderedList.initialCount - 1;
    var listCondition = unorderedList.initialCount;
    unorderedList.appendListItems(listItemsLength, listCondition);
    unorderedList.createLastLink('See-More');
  }
  
  //creates anchor link for see-less and see-more
  this.createLastLink = function(textId) {
    $('<li/>', { 'id': textId }).html($('<a/>').text(textId)).appendTo($('#listtwo'));
  }
  
  //binds events
  this.bindEvents = function() {
    $mainContainer.on('click', '#head', this.displayAndAppendListItems);
    $mainContainer.on('click', '#See-More', this.displayItemsOnPriorityBasis);
    $mainContainer.on('click', '#See-Less', this.displayItemsOnAlphabeticOrderBasis);
  }
  
  //initializes unordered list
  this.initializeUnorderedList = function() {
    this.createDOMForUnorderedList();
    this.createListItems();
    this.bindEvents();
  }
  this.initializeUnorderedList();
}