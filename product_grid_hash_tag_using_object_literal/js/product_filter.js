var productFilter = {
  filterHash: {},

  bindEvents: function() {
    //binds click event to the input checkboxes and radio buttons 
    $('#main-container').on('change', 'input', hashManager.setWindowHashForFilters);

    //binds change event on sort by select list
    $('#sort-by-list').on('change', hashManager.setWindowHashForSorting);
  },
  
  //sorts products according to filter selected
  sortProducts: function(selectedSortOption) {
    shoppingGrid.filteredProducts.sort(compare);
    function compare(product1, product2) {
      var filterData1 = $(product1).data(selectedSortOption + 'filter'), filterData2 = $(product2).data(selectedSortOption + 'filter');
      if (filterData1 < filterData2) {
        return -1;
      } else if (filterData1 > filterData2) {
        return 1;
      } else {
        var productName1 = $(product1).data('namefilter'), productName2 = $(product2).data('namefilter');
        if (productName1 < productName2) {
          return -1;
        } else if (productName1 > productName2) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  },

  //filters the products from selected filter
  filterProducts: function() {
    var $gridProducts = shoppingGrid.gridProducts;
    var productFilter = [];
    for (var i = 0, len = shoppingGrid.filters.length; i < len; i++) {
      productFilter = this.filterSelection(shoppingGrid.filters[i]);
      if (productFilter.length > 0){
        $gridProducts = this.getFilteredProducts(productFilter, $gridProducts);
      }
    }
    shoppingGrid.filteredProducts = $gridProducts;
  },
  
  //filters the products on the basis of the selected products string using filter()
  getFilteredProducts: function(productFilter, $gridProducts) {
    var filteredProducts = this.getFilteredProductsString(productFilter);
    var $gridProducts = $gridProducts.filter(filteredProducts);
    return $gridProducts;
  },
  
  //creates and returns string of selectedProducts[]
  getFilteredProductsString: function(productFilter) {
    var products = productFilter.join();
    return products;
  },

  //selects the filtered products in an array
  filterSelection: function(filterContainer) {
    var selectedProducts = [];
    var $filters = $('#' + filterContainer + 'Tag' + ' input[data-filter]:checked');
    if ($filters.length > 0) {
      $filters.each(function() {
        selectedProducts.push("img[data-" + filterContainer + "filter='" + $(this).attr('data-filter') + "']");
      });
    }
    return selectedProducts;
  }
};