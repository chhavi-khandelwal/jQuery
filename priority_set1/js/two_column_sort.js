function TwoColumnSort() {
  this.unorderedList = []; 

  this.initialize = function() {
    var listCollection = this.loadData();
    this.createUnorderedList(listCollection);
  }
  
  //loads data from json
  this.loadData = function() {
    var list = null;
    $.ajax({
      async: false,
      url: 'json/two_column_sort.json',
      dataType: 'json',
      success: function(data) {
        list = data;
      }
    });
    return list;
  }
  
  //creates unordered list objects and displays them
  this.createUnorderedList = function(listCollection) {
    for (var i = 0, len = listCollection.length; i < len; i++) {
      this.unorderedList.push(new UnorderedList(listCollection[i], i));
    }
    this.displayUnorderedList();
  }
  
  //displays unordered list
  this.displayUnorderedList = function() {
    $.each(this.unorderedList, function(key, unorderedList) {
      unorderedList.DOMList.appendTo($mainContainer);
    });
  }
}

$(document).ready(function() {
  $mainContainer = $('#main-container');
  twoColumnSort = new TwoColumnSort();
  twoColumnSort.initialize();
});