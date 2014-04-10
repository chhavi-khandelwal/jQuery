var TwoColumnSort = function() {
  this.initialize();
}

TwoColumnSort.prototype = {
  initialize: function() {
    this.unorderedList = []; 
    this.listCollection = this.loadData();
    this.createUnorderedList();
  },
  
  //loads data from json
  loadData: function() {
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
  },
  
  //creates unordered list objects and displays them
  createUnorderedList: function() {
    for (var i = 0, len = this.listCollection.length; i < len; i++) {
      this.unorderedList.push(new UnorderedList(this.listCollection[i], i));
    }
    this.displayUnorderedList();
  },
  
  //displays unordered list
  displayUnorderedList: function() {
    $.each(this.unorderedList, function(key, unorderedList) {
      unorderedList.DOMList.appendTo($mainContainer);
    });
  }

}

$(document).ready(function() {
  $mainContainer = $('#main-container');
  twoColumnSort = new TwoColumnSort();
});