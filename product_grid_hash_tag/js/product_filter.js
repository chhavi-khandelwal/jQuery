function ProductFilter() {
  this.filterHash = {};

  this.bindEvents = function() {
    //binds click event to the input checkboxes and radio buttons 
    $('#main-container').on('change', 'input', this.setWindowHash);

    //binds change event on sort by select list
    $('#sort-by-list').on('change', function() { 
      productGrid.displayGridProducts(1, productPaginator.productsPerPage, $(this).val());
    });
  }
  
  //sorts products according to filter selected
  this.sortProducts = function(selectedSortOption) {
    productGrid.sortByFilter = selectedSortOption;
    productGrid.filteredProducts.sort(compare);
    function compare(product1, product2) {
      var filterData1 = $(product1).data(productGrid.sortByFilter + 'filter'), filterData2 = $(product2).data(productGrid.sortByFilter + 'filter');
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
    for (var i = 0; i < productGrid.filters.length; i++) {
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
    productFilter.createCompleteWindowHash();
  }
  
  //creates complete hash after combining hashes for color brand and availaibility
  this.createCompleteWindowHash = function() {
    var windowHashParams = [];
    for (var filter in productFilter.filterHash) {
      var filterParams = productFilter.filterHash[filter];
      if (filterParams.length) {
        var hashParam = filter + "=[" + filterParams + "]";
        windowHashParams.push(hashParam); 
      }
    }
    this.appendHashToWindow(windowHashParams);
  }
  
  //append created hash to the window
  this.appendHashToWindow = function(windowHashParams) {
    if (!($.isEmptyObject(productFilter.filterHash))) {
      windowHashParams = '#' + windowHashParams.join('&') + '&';
      window.location.hash = windowHashParams + 'page=[' + 1 + ']';
    }
  }
  
  //creates hash from the marked color and brand filters
  this.createHashForColorsAndBrands = function(filter) {
    if (!this.filterHash[filter.attr('class')]) {
      this.filterHash[filter.attr('class')] = [];
    }
    this.filterHash[filter.attr('class')].push(filter.data('filter'));
  }
  
  //creates hash from the marked availaibility filters
  this.createAvailabilityHash = function(filter) {
    if (filter.attr('id') == 'available') {
      this.filterHash[filter.attr('class')] = [];
      this.filterHash[filter.attr('class')].push(filter.data('filter'));
    }
  }
}