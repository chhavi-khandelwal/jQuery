$(document).ready(function() {
  productGrid = new ProductGrid();
  productPaginator = new ProductPaginator();
  productFilter = new ProductFilter();
  productGrid.initialize();
  productFilter.bindEvents();
  productPaginator.bindEvents();
});

function ProductGrid() {
  this.gridProducts = [];
  this.filteredProducts = [];
  this.filters = ["brand", "color", "sold_Out"];
  var productGrid = this;
  var products = null;
  var $gridProducts;
  var $productGrid = $('#product-grid');
  
  //initializes all the functions that build the product grid
  this.initialize = function() {
    this.loadProducts();
    this.createProductsHTML();
    this.displayGridProducts(1, productPaginator.productsPerPage);
  }
  
  //sends Ajax request to get product json
  this.loadProducts = function() {
    $.ajax({
      async: false,
      url: 'json/product_grid.json',
      dataType: 'json',
      success: function(data) {
        products = data;
      }
    });
  }
  
  //create products html from json collection
  this.createProductsHTML = function() {
    for (var i in products) {  
      var url = products[i].url;
      var productColor = products[i].color;
      var productBrand = products[i].brand;
      var sold_out = products[i].sold_out;
      $('<img/>', {src: url, class: 'gridProduct'})
        .attr({'data-colorfilter': productColor, 'data-brandfilter': productBrand, 'data-sold_Outfilter': sold_out})
        .appendTo($productGrid);
    }
    $gridProducts = $('.gridProduct');
    this.gridProducts = $gridProducts;
    this.filteredProducts = this.gridProducts;
  }
  
  //filters and adds pagination to display products
  this.displayGridProducts = function(pageNumber, productsPerPage) {
    productFilter.filterProducts();
    productPaginator.paginateProducts(productsPerPage);
    productGrid.displayFilteredProducts(pageNumber);
    productPaginator.displayPagination();
  }
  
  //displays filtered products
  this.displayFilteredProducts = function(pageNumber) {
    var products = productPaginator.paginatedProducts[pageNumber];
    $gridProducts.hide();
    if (products) {
      $productGrid.find('p').remove();
      products.show();
    }
    else {
      $productGrid.addClass('grid-text').append($('<p/>').text('Product Not Available'));
      $('#pagination-container').html('');
    }
  }
}