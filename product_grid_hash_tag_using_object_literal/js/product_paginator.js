var productPaginator = {
  paginatedProducts: {},
  numberOfPages: 0,

  paginateProducts: function(productsPerPage) {
    this.paginatedProducts = {};
    var productsPerPage = parseInt(productsPerPage, 10);
    var productsCount = shoppingGrid.filteredProducts.length;
    this.numberOfPages = Math.ceil(productsCount/productsPerPage);
    //hash being created with key as page no. and value as corresponding products to be shown
    var productIndex = 0;
    for (var i = 1; i <= this.numberOfPages; i++) {
      this.paginatedProducts[i] = shoppingGrid.filteredProducts.slice(productIndex, productIndex + productsPerPage);
      productIndex = productIndex + productsPerPage;
    }
  },
  
  //shows page numbers
  displayPagination: function() {
    var pageNumbers = [];
    for (var i = 1; i <= this.numberOfPages; i++) {
      pageNumbers.push($('<a/>', {class: 'page', id: i}).text(i));
    }
    $paginationContainer.html(pageNumbers);
    $('.page').first().addClass('current-page');
  },

  bindEvents: function() {
    $paginationContainer.on('click', '.page', hashManager.setPageNumberToWindowHash);
    $('#pagination-list').on('change', hashManager.setPaginationToWindowHash);
  },
  
  //highlights current page
  highlightPageNumber: function(currentPageNumber) {
    $('#' + currentPageNumber).addClass('current-page').siblings().removeClass('current-page');
  }
};