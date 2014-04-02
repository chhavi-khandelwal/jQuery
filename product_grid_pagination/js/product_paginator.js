function ProductPaginator() {
  this.paginatedProducts = {};
  this.productsPerPage = 3;
  this.numberOfPages;
  var $paginationContainer = $('#pagination-container');

  this.paginateProducts = function(productsPerPage) {
    this.paginatedProducts = {};
    this.productsPerPage = productsPerPage;
    var productsCount = productGrid.filteredProducts.length;
    this.numberOfPages = Math.ceil(productsCount/this.productsPerPage);
    //hash being created with key as page no. and value as corresponding products to be shown
    var productIndex = 0;
    for (var i = 1; i <= this.numberOfPages; i++) {
      this.paginatedProducts[i] = productGrid.filteredProducts.slice(productIndex, productIndex + this.productsPerPage);
      productIndex = productIndex + this.productsPerPage;
    }
  }
  
  //shows page numbers
  this.displayPagination = function() {
    var pageNumbers = [];
    for (var i = 1; i <= this.numberOfPages; i++) {
      pageNumbers.push($('<a/>', {class: 'page'}).text(i));
    }
    $paginationContainer.html(pageNumbers);
    $('.page').first().addClass('current-page');
  }

  this.bindEvents = function() {
    $paginationContainer.on('click', '.page', this.displayPageProducts);
    $('#pagination-list').on('change', this.updateProductsToDisplay);
  }
  
  //updates products to display when pagination changed
  this.updateProductsToDisplay = function() {
    var productsPerPage = parseInt($(this).val());
    productGrid.displayGridProducts(1, productsPerPage);
  }
  
  //
  this.displayPageProducts = function() {
    var $currentPageNumber = $(this);
    var currentPageNumber = parseInt($currentPageNumber.text());
    productPaginator.highlightPageNumber($currentPageNumber);
    productGrid.displayFilteredProducts(currentPageNumber);
  }
  
  this.highlightPageNumber = function($currentPageNumber) {
    $currentPageNumber.addClass('current-page').siblings().removeClass('current-page');
  }
}