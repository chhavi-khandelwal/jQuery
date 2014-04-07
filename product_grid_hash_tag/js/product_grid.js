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
  this.filters = ["brand", "color", "sold_out"];
  var productGrid = this;
  var products = null;
  var $gridProducts;
  var $productGrid = $('#product-grid');
  
  //initializes all the functions that build the product grid
  this.initialize = function() {
    this.loadProducts();
    this.createProductsHTML();
    this.appendWindowLoadHash();
    this.bindWindowHashChange();
  }
  
  //append hash when window is loaded
  this.appendWindowLoadHash = function() {
    if (window.location.hash == '') {
      window.location.hash = "#pagination=[3]&sortBy=[color]&page=[1]";
    }
    else {
      this.displayProductsExtractedFromHash();
      var sortByParam = this.getWindowHashParam('sortBy');
      $('#sort-by-list').val(sortByParam);
      $('#pagination-list').val(this.getWindowHashParam('pagination'));
    }
  }
  
  // returns value of the key passed from the url hash in string
  this.getParameterByName = function(name) {
    var regex = new RegExp("[\\#&]" + name + "=([^&#]*)"),
        results = regex.exec(location.hash);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  //binds on hash change event
  this.bindWindowHashChange = function() {
    window.onhashchange = function() {
      productGrid.displayProductsExtractedFromHash();
    }
  }
  
  //extracts products from hash and displays them 
  this.displayProductsExtractedFromHash = function() {
    this.markExtractedFilters();
    var pageNumber = parseInt(this.getWindowHashParam('page'), 10);
    var productsPerPage = parseInt(this.getWindowHashParam('pagination'), 10);
    var sortByFilter = this.getWindowHashParam('sortBy');
    this.displayGridProducts(pageNumber, productsPerPage, sortByFilter);
  }
  
  //get parameters from the string
  this.getWindowHashParam = function(hashParam) {
    return this.getParameterByName(hashParam).split('[')[1].split(']')[0];
  }
  
  //sets window hash of the productgrid
  this.setWindowHash = function(hashValue, hashKey) {
    var windowHashParams = hashKey + '=' + productGrid.getParameterByName(hashKey);
    window.location.hash = window.location.hash.replace(windowHashParams, (hashKey + "=[" + hashValue + "]"));
  }
  
  //marks checkboxes extracted from hash
  this.markExtractedFilters = function() {
    for (var i = 0, len = this.filters.length; i < len; i++) {
      var filter = this.filters[i];
      var filterHash = this.getParameterByName(filter);
      if (filterHash.length) {
        this.checkHashFilters(filter, filterHash);
      }
    }
  }
  
  //marks filters
  this.checkHashFilters = function(filter, filterHash) {
    var hashFilters = filterHash.split('[')[1].split(']')[0].split(',');
    $('#' + filter + 'Tag').find('input').each(function(index) {
      var filterElement = $(this);
      var dataFilter = '' + filterElement.data('filter');
      if ($.inArray(dataFilter, hashFilters) != -1) {
        filterElement.prop('checked', true);
      }
      else
        filterElement.prop('checked', false);
    });
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
        .attr({'data-colorfilter': productColor, 'data-brandfilter': productBrand, 'data-sold_outfilter': sold_out})
        .appendTo($productGrid);
    }
    $gridProducts = $('.gridProduct');
    this.gridProducts = $gridProducts;
    this.filteredProducts = this.gridProducts;
  }
  
  //filters and adds pagination to display products
  this.displayGridProducts = function(pageNumber, productsPerPage, sortByTag) {
    productFilter.filterProducts();
    productFilter.sortProducts(sortByTag);
    productPaginator.paginateProducts(productsPerPage);
    productGrid.displayFilteredProducts(pageNumber, sortByTag);
    productPaginator.displayPagination();
    productPaginator.highlightPageNumber(parseInt(this.getWindowHashParam('page')));
  }
  
  //displays filtered products
  this.displayFilteredProducts = function(pageNumber) {
    var products = productPaginator.paginatedProducts[pageNumber];
    if (products) {
      $productGrid.find('p').remove();
      $productGrid.html(products);
    }
    else {
      $productGrid.html('');
      $productGrid.addClass('grid-text').append($('<p/>').text('Product Not Available'));
      $('#pagination-container').html('');
    }
  }
}