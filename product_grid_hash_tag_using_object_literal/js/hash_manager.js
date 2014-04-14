var hashManager = {

  extractInfoFromWindowHash: function() {
    if (window.location.hash == '') {
      window.location.hash = "#pagination=[" + productGrid.defaultPagination + "]&sortBy=[" + productGrid.defaultSortFilter + "]&page=[" + productGrid.firstPage + "]";
    }
    else {
      this.displayProductsExtractedFromHash();
      var sortByParam = this.getWindowHashParam('sortBy');
      var paginationParam = this.getWindowHashParam('pagination');
      $('#sort-by-list').val(sortByParam);
      $('#pagination-list').val(paginationParam);
    }
  },
  
  // returns value of the key passed from the url hash in string
  getParameterByName: function(name) {
    var regex = new RegExp("[\\#&]" + name + "=([^&#]*)"),
        results = regex.exec(location.hash);
    return results == null ? "" : results[1].replace(/\+/g, " ");
  },
  
  //binds on hash change event
  bindWindowHashChange: function() {
    window.onhashchange = function() {
      hashManager.displayProductsExtractedFromHash();
    }
  },
  
  //extracts products from hash and displays them 
  displayProductsExtractedFromHash: function() {
    this.markExtractedFilters();
    var pageNumber = parseInt(this.getWindowHashParam('page'), 10);
    var productsPerPage = parseInt(this.getWindowHashParam('pagination'), 10);
    var sortByFilter = this.getWindowHashParam('sortBy');
    productGrid.displayGridProducts(pageNumber, productsPerPage, sortByFilter);
  },
  
  //get parameters from the string
  getWindowHashParam: function(hashParam) {
    return this.getParameterByName(hashParam).split('[')[1].split(']')[0];
  },
  
  //sets window hash of the productgrid
  setWindowHash: function(hashValue, hashKey) {
    var windowHashParams = hashKey + '=' + this.getParameterByName(hashKey);
    window.location.hash = window.location.hash.replace(windowHashParams, (hashKey + "=[" + hashValue + "]"));
  },
  
  //marks checkboxes extracted from hash
  markExtractedFilters: function() {
    for (var i = 0, len = shoppingGrid.filters.length; i < len; i++) {
      var filter = shoppingGrid.filters[i];
      var filterHash = this.getParameterByName(filter);
      if (filterHash.length) {
        this.checkHashFilters(filter, filterHash);
      }
    }
  },
  
  //marks filters
  checkHashFilters: function(filter, filterHash) {
    var hashFilters = filterHash.split('[')[1].split(']')[0].split(',');
    $('#' + filter + 'Tag').find('input').each(function(index) {
      var filterElement = $(this);
      var dataFilter = '' + filterElement.data('filter');
      if ($.inArray(dataFilter, hashFilters) != -1) {
        filterElement.prop('checked', true);
      }
      else
        filterElement.prop('checked', false);
    });
  },

  //sets window hash once clicked on page nos.
  setPageNumberToWindowHash: function() {
    var currentPageNumber = parseInt($(this).attr('id'));
    hashManager.setWindowHash(currentPageNumber, 'page');
  },
  
  //sets window hash once pagination value selected from the list
  setPaginationToWindowHash: function() {
    var productsPerPage = parseInt($(this).val());
    hashManager.setWindowHash(productsPerPage, 'pagination');
    hashManager.setWindowHash(productGrid.firstPage, 'page');
  },  

  //sets hash once filters are checked
  setWindowHashForFilters: function() {
    productFilter.filterHash = {};
    $("input:checked").each(function() {
      var filter = $(this);
      switch (filter.attr('type')) {
        case 'checkbox': 
          hashManager.createHashForColorsAndBrands(filter);
          break;
        case 'radio':
          hashManager.createAvailabilityHash(filter);
          break;
      }
    });
    hashManager.maintainHashToUrlForEachFilter();
  },
  
  //maintain hash for each filter
  maintainHashToUrlForEachFilter: function() {
    for (var i = 0, len = shoppingGrid.filters.length; i < len; i++) {
      var filter = shoppingGrid.filters[i];
      this.appendHashForEachFilter(filter);
    }
  },
  
  //appends hash for each filter if exists
  appendHashForEachFilter: function(filter) {
    var filterParams = productFilter.filterHash[filter];
    var windowHash = window.location.hash;
    if (filterParams && (windowHash.indexOf(filter + '=')) != -1) {
      this.setWindowHash(filterParams, filter);
      this.setWindowHash(productGrid.firstPage, 'page');
    }
    else if (filterParams && (windowHash.indexOf(filter + '=')) == -1) {
      var windowHashParams = '#' + filter + "=[" + filterParams + "]" + '&';
      this.setWindowHash(productGrid.firstPage, 'page');
      window.location.hash = window.location.hash.replace('#', windowHashParams);
    }
    else {
      var hashParam = filter + '=' + this.getParameterByName(filter) + '&';
      window.location.hash = window.location.hash.replace(hashParam, '');
    }
  },
  
  //creates hash from the marked color and brand filters
  createHashForColorsAndBrands: function(filter) {
    if (!productFilter.filterHash[filter.attr('class')]) {
      productFilter.filterHash[filter.attr('class')] = [];
    }
    productFilter.filterHash[filter.attr('class')].push(filter.data('filter'));
  },
  
  //creates hash from the marked availability filters
  createAvailabilityHash: function(filter) {
    if (filter.attr('id') == 'available') {
      productFilter.filterHash[filter.attr('class')] = [];
      productFilter.filterHash[filter.attr('class')].push(filter.data('filter'));
    }
    else {
      var availabilityHashParam = 'sold_out=' + this.getParameterByName('sold_out') + '&';
      window.location.hash = window.location.hash.replace(availabilityHashParam, '');
    }
  },
  
  //sets window hash when sort list value selected
  setWindowHashForSorting: function() {
    hashManager.setWindowHash($(this).find('option:selected').val(), 'sortBy');
    hashManager.setWindowHash(productGrid.firstPage, 'page');
  }
};