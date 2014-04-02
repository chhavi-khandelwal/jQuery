function ProductFilter() {

  this.bindEvents = function() {
    //binds click event to the input checkboxes and radio buttons 
    $('#main-container').on('click', 'input', function() {
      productGrid.displayGridProducts(1, productPaginator.productsPerPage, productGrid.sortByFilter);
    });
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
    var filters = $('#' + filterContainer + 'Tag' + ' input[data-filter]:checked');
    if (filters.length > 0) {
      filters.each(function() {
        selectedProducts.push("img[" + "data-" + filterContainer + "filter" + "=" + "'" + $(this).attr('data-filter') + "'" + "]");
     });
    }
    return selectedProducts;
  }
}