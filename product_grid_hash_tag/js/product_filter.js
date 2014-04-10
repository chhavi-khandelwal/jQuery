function ProductFilter() {
  this.filterHash = {};

  this.bindEvents = function() {
    //binds click event to the input checkboxes and radio buttons 
    $('#main-container').on('change', 'input', this.setWindowHash);

    //binds change event on sort by select list
    $('#sort-by-list').on('change', this.setWindowHashForSorting);
  }
  
  //sets window hash when sort list value selected
  this.setWindowHashForSorting = function() {
    productGrid.setWindowHash($(this).find('option:selected').val(), 'sortBy');
    productGrid.setWindowHash(productGrid.firstPage, 'page');
  }
  
  //sorts products according to filter selected
  this.sortProducts = function(selectedSortOption) {
    productGrid.filteredProducts.sort(compare);
    function compare(product1, product2) {
      var filterData1 = $(product1).data(selectedSortOption + 'filter'), filterData2 = $(product2).data(selectedSortOption + 'filter');
      if (filterData1 < filterData2) {
        return -1;
      } else if (filterData1 > filterData2) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  //filters the products from selected filter
  this.filterProducts = function() {
    var $gridProducts = productGrid.gridProducts;
    var productFilter = [];
    for (var i = 0, len = productGrid.filters.length; i < len; i++) {
      productFilter = this.filterSelection(productGrid.filters[i]);
      if (productFilter.length > 0){
        $gridProducts = this.getFilteredProducts(productFilter, $gridProducts);
      }
    }
    productGrid.filteredProducts = $gridProducts;
  }
  
  //filters the products on the basis of the selected products string using filter()
  this.getFilteredProducts = function(productFilter, $gridProducts) {
    var filteredProducts = this.getFilteredProductsString(productFilter);
    var $gridProducts = $gridProducts.filter(filteredProducts);
    return $gridProducts;
  }
  
  //creates and returns string of selectedProducts[]
  this.getFilteredProductsString = function(productFilter) {
    var products = productFilter.join();
    return products;
  }

  //selects the filtered products in an array
  this.filterSelection = function(filterContainer) {
    var selectedProducts = [];
    var $filters = $('#' + filterContainer + 'Tag' + ' input[data-filter]:checked');
    if ($filters.length > 0) {
      $filters.each(function() {
        selectedProducts.push("img[data-" + filterContainer + "filter='" + $(this).attr('data-filter') + "']");
      });
    }
    return selectedProducts;
  }
  
  //sets hash once filters are checked
  this.setWindowHash = function() {
    productFilter.filterHash = {};
    $("input:checked").each(function() {
      var filter = $(this);
      switch (filter.attr('type')) {
        case 'checkbox': 
          productFilter.createHashForColorsAndBrands(filter);
          break;
        case 'radio':
          productFilter.createAvailabilityHash(filter);
          break;
      }
    });
    productFilter.maintainHashToUrlForEachFilter();
  }
  
  //maintain hash for each filter
  this.maintainHashToUrlForEachFilter = function() {
    for (var i = 0, len = productGrid.filters.length; i < len; i++) {
      var filter = productGrid.filters[i];
      this.appendHashForEachFilter(filter);
    }
  }
  
  //appends hash for each filter if exists
  this.appendHashForEachFilter = function(filter) {
    var filterParams = this.filterHash[filter];
    var windowHash = window.location.hash;
    if (filterParams && (windowHash.indexOf(filter + '=')) != -1) {
      productGrid.setWindowHash(filterParams, filter);
      productGrid.setWindowHash(productGrid.firstPage, 'page');
    }
    else if (filterParams && (windowHash.indexOf(filter + '=')) == -1) {
      var windowHashParams = '#' + filter + "=[" + filterParams + "]" + '&';
      productGrid.setWindowHash(productGrid.firstPage, 'page');
      window.location.hash = window.location.hash.replace('#', windowHashParams);
    }
    else {
      var hashParam = filter + '=' + productGrid.getParameterByName(filter) + '&';
      window.location.hash = window.location.hash.replace(hashParam, '');
    }
  }
  
  //creates hash from the marked color and brand filters
  this.createHashForColorsAndBrands = function(filter) {
    if (!this.filterHash[filter.attr('class')]) {
      this.filterHash[filter.attr('class')] = [];
    }
    this.filterHash[filter.attr('class')].push(filter.data('filter'));
  }
  
  //creates hash from the marked availability filters
  this.createAvailabilityHash = function(filter) {
    if (filter.attr('id') == 'available') {
      this.filterHash[filter.attr('class')] = [];
      this.filterHash[filter.attr('class')].push(filter.data('filter'));
    }
    else {
      var availabilityHashParam = 'sold_out=' + productGrid.getParameterByName('sold_out') + '&';
      window.location.hash = window.location.hash.replace(availabilityHashParam, '');
    }
  }
}