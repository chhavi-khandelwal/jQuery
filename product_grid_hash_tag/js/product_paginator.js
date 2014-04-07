function ProductPaginator() {
  this.paginatedProducts = {};
  this.numberOfPages;
  var $paginationContainer = $('#pagination-container');

  this.paginateProducts = function(productsPerPage) {
    this.paginatedProducts = {};
    var productsPerPage = parseInt(productsPerPage, 10);
    var productsCount = productGrid.filteredProducts.length;
    this.numberOfPages = Math.ceil(productsCount/productsPerPage);
    //hash being created with key as page no. and value as corresponding products to be shown
    var productIndex = 0;
    for (var i = 1; i <= this.numberOfPages; i++) {
      this.paginatedProducts[i] = productGrid.filteredProducts.slice(productIndex, productIndex + productsPerPage);
      productIndex = productIndex + productsPerPage;
    }
  }
  
  //shows page numbers
  this.displayPagination = function() {
    var pageNumbers = [];
    for (var i = 1; i <= this.numberOfPages; i++) {
      pageNumbers.push($('<a/>', {class: 'page', id: i}).text(i));
    }
    $paginationContainer.html(pageNumbers);
    $('.page').first().addClass('current-page');
  }

  this.bindEvents = function() {
    $paginationContainer.on('click', '.page', this.setPageNumberToWindowHash);
    $('#pagination-list').on('change', this.setPaginationToWindowHash);
  }
  
  //highlights current page
  this.highlightPageNumber = function(currentPageNumber) {
    $('#' + currentPageNumber).addClass('current-page').siblings().removeClass('current-page');
  }
  
  //sets window hash once clicked on page nos.
  this.setPageNumberToWindowHash = function() {
    var currentPageNumber = parseInt($(this).attr('id'));
    productGrid.setWindowHash(currentPageNumber, 'page');
  }
  
  //sets window hash once pagination value selected from the list
  this.setPaginationToWindowHash = function() {
    var productsPerPage = parseInt($(this).val());
    productGrid.setWindowHash(productsPerPage, 'pagination');
    productGrid.setWindowHash(1, 'page');
  }
}