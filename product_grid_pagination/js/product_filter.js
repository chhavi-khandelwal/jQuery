function ProductFilter() {

  //binds click event to the input checkboxes and radio buttons 
  this.bindEvents = function() {
    $('#main-container').on('click', 'input', function() {
      productGrid.displayGridProducts(1, productPaginator.productsPerPage);
    });
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