var UnorderedList = function(list, id) {
  this.initialize(list, id);
  this.initializeUnorderedList();
}
UnorderedList.prototype = {
  initialize: function(list, id) {
    this.listId = id;
    this.initialCount = list.initial_count;
    this.items = list.items;
    this.sortedListItems = [];
    this.DOMList = null;
    this.sortingType = { 'Alphabetic-Sort': 'name', 'Priority-Sort': 'priorityOrder' };
    this.sortingOrder = {'Ascending': 0, 'Descending': 1};
    this.selectors = { 'ulHead': '#head_' + this.listId, 'seeMore': '#See-More' + this.listId, 'seeLess': '#See-Less' + this.listId, 'sortType': '.sorting-type' + this.listId, 'sortOrder': '.sorting-order' + this.listId, 'listOne': '#listone_' + this.listId, 'listTwo': '#listtwo_' + this.listId };
    this.listLengthAsPerInitialCount = 2 * this.initialCount - 1;
    unorderedList = this;
  },
  
  //creates dom for nested lists inside the main list
  createDOMForNestedUnorderedList: function(listId) {
    return $('<ul/>', { id: listId, class: 'nested-lists' });
  },
  
  //create dom for unordered list
  createDOMForUnorderedList: function() {
    var nestedListIds = ['listone', 'listtwo'];
    var nestedLists = [];
    for (var i = 0, len = nestedListIds.length; i < len; i++) {
      nestedLists.push(this.createDOMForNestedUnorderedList(nestedListIds[i] + '_' + this.listId));
    }
    var $nestedListsContainer = $('<div/>', {class: 'nested-container'}).append(nestedLists);
    this.DOMList = $('<ul/>', { 'data-initial-count': this.initialCount, class: 'two-column-sort' }).html($('<a/>', { id: 'head_' + this.listId }).text('UnorderedList-' + this.listId))
      .append($nestedListsContainer);
  },
  
  //create sort buttons
  createSortButtons: function(className, buttonsCollection) {
    var sortButtons = [];
    for (var key in buttonsCollection) {
      sortButtons.push($('<input>', { class: className + this.listId, id: key + this.listId, 'type': 'button', 'value': key }));
    }
    return sortButtons;
  },
  
  //append sort buttons to the list
  appendSortButtons: function() {
    var $sortButtonsContainer = $('<div/>', { class: 'sort-buttons-container' })
      .prependTo(this.DOMList);
    var $typeButtons = this.createSortButtons('sorting-type', this.sortingType);
    var $orderButtons = this.createSortButtons('sorting-order', this.sortingOrder);
    $sortButtonsContainer.append($typeButtons);
    $sortButtonsContainer.append($orderButtons);
  },
  
  //displays list items of the nested lists
  displayListItemsOnPageLoad: function() {
    unorderedList.appendSortButtons();
    this.highlightButtonsOnPageLoad();
    this.sortListItems('priorityOrder');
    this.displayListItems(this.listLengthAsPerInitialCount, this.initialCount, 'See-More');
  },
  
  //highlights selected buttons
  highlightButtonsOnPageLoad: function() {
    this.DOMList.find('#Priority-Sort' + this.listId).addClass('selected');
    this.DOMList.find('#Ascending' + this.listId).addClass('selected');
  },

  //sorts items on the basis of name or priority data and name
  sortListItems: function(sortType, sortOrder) {
    if (sortOrder) {
      this.sortedListItems.sort(compare).reverse();
    } 
    else {
      this.sortedListItems.sort(compare);
    }
    function compare(item1, item2) {
      var sortData1 = item1[sortType], sortData2 = item2[sortType];
      if (sortData1 < sortData2) {
        return -1;
      } else if (sortData1 > sortData2) {
        return 1;
      } else {
        return 0;
      }
    }
  },
  
  //creates list item objects
  createListItems: function() {
    for (var i in this.items) {
      this.sortedListItems.push(new ListItem(this.items[i]));
    }
    this.listItemsTotalLength = this.sortedListItems.length;
    itemsPerList = this.listItemsTotalLength / 2;
  },
  
  //displays listitems when event is triggered on buttons or see more , see less links
  appendListItems: function(listItemsLength, listCondition) {
    var $listOne = this.DOMList.find(this.selectors.listOne).html('');
    var $listTwo = this.DOMList.find(this.selectors.listTwo).html('');
    for (var i = 0, len = listItemsLength; i < len; i++) {  
      if (i < listCondition) { 
        this.sortedListItems[i].DOMListItem.appendTo($listOne);          
      }
      else {
        this.sortedListItems[i].DOMListItem.appendTo($listTwo);          
      }
    }
  },
  
  //displays list items
  displayListItems: function(listItemsLength, listCondition, lastLink) {
    this.appendListItems(listItemsLength, listCondition);
    this.createLastLink(lastLink);
  },

  //creates anchor link for see-less and see-more
  createLastLink: function(textId) {
    $('<li/>', { 'id': textId + this.listId }).html($('<a/>', {class: 'last-link'}).text(textId)).appendTo(this.DOMList.find(this.selectors.listTwo));
  },
  
  //displays on the basis of order or type selected
  displayItemsAccordingToType: function() {
    var $sortButton = $(this);
    var sortTypeSelector = '.sorting-type' + unorderedList.listId + '.selected';
    var sortOrderSelector = '.sorting-order' + unorderedList.listId + '.selected';
    var className = $sortButton.attr('class');
    $sortButton.addClass('selected').siblings('.' + className).removeClass('selected');
    var sortType = unorderedList.sortingType[$(sortTypeSelector).val()];
    var sortOrder = parseInt(unorderedList.sortingOrder[$(sortOrderSelector).val()]);
    unorderedList.sortListItems(sortType, sortOrder);
    unorderedList.checkListStatusAndAppendItems();
  },
  
  //appends items by checking status of the list(whether see-more is visible or not)
  checkListStatusAndAppendItems: function() {
    if ($(this.selectors.listTwo).find('#See-More' + this.listId).length) {
      this.displayListItems(this.listLengthAsPerInitialCount, this.initialCount, 'See-More');
    }
    else {
      this.displayListItems(this.listItemsTotalLength, itemsPerList, 'See-Less');
    }
  },
  
  //binds events
  bindEvents: function() {
    $mainContainer.on('click', this.selectors.seeMore, function() {
      unorderedList.displayListItems(unorderedList.listItemsTotalLength, itemsPerList, 'See-Less');
    });
    $mainContainer.on('click', this.selectors.seeLess, function() {
      unorderedList.displayListItems(unorderedList.listLengthAsPerInitialCount, unorderedList.initialCount, 'See-More');
    });
    $mainContainer.on('click', this.selectors.sortType + ',' + this.selectors.sortOrder , this.displayItemsAccordingToType);
  },
  
  //initializes unordered list
  initializeUnorderedList: function() {
    this.createDOMForUnorderedList();
    this.createListItems();
    this.displayListItemsOnPageLoad();
    this.bindEvents();
  }
}