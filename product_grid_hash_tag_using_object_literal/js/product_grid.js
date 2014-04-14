var productGrid = {
  firstPage: 1,
  defaultPagination: 3,
  defaultSortFilter: 'color',
  
  //initializes all the functions that build the product grid
  initialize: function() {
    var products = this.loadProducts();
    this.createProductsHTML(products);
    hashManager.extractInfoFromWindowHash();
    hashManager.bindWindowHashChange();
    productFilter.bindEvents();
    productPaginator.bindEvents();
  },

  //sends Ajax request to get product json
  loadProducts: function() {
    var products = null;
    $.ajax({
      async: false,
      url: 'json/product_grid.json',
      dataType: 'json',
      success: function(data) {
        products = data;
      }
    });
    return products;
  },
  
  //create products html from json collection
  createProductsHTML: function(products) {
    for (var i in products) {  
      var url = products[i].url;
      var productColor = products[i].color;
      var productBrand = products[i].brand;
      var productName = products[i].name;
      var sold_out = products[i].sold_out;
      $('<img/>', {src: url, class: 'gridProduct'})
        .attr({'data-namefilter': productName, 'data-colorfilter': productColor, 'data-brandfilter': productBrand, 'data-sold_outfilter': sold_out})
        .appendTo($productGrid);
    }
    shoppingGrid.gridProducts = $('.gridProduct');
    shoppingGrid.filteredProducts = shoppingGrid.gridProducts;
  },
  
  //filters and adds pagination to display products
  displayGridProducts: function(pageNumber, productsPerPage, sortByTag) {
    productFilter.filterProducts();
    productFilter.sortProducts(sortByTag);
    productPaginator.paginateProducts(productsPerPage);
    productGrid.displayFilteredProducts(pageNumber);
    productPaginator.displayPagination();
    productPaginator.highlightPageNumber(parseInt(hashManager.getWindowHashParam('page')));
  },
  
  //displays filtered products
  displayFilteredProducts: function(pageNumber) {
    var products = productPaginator.paginatedProducts[pageNumber];
    if (products) {
      $productGrid.find('p').remove();
      $productGrid.html(products);
    }
    else {
      $productGrid.html('');
      $productGrid.addClass('grid-text').append($('<p/>').text('Product Not Available'));
      $paginationContainer.html('');
    }
  }
}