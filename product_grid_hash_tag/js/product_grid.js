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
  this.windowHash = {};
  this.sortByFilter = 'color';
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
      window.location.hash = "#page=[1]";
    }
    else {
      this.displayProductsExtractedFromHash();
    }
  }
  
  //binds on hash change event
  this.bindWindowHashChange = function() {
    window.onhashchange = function() {
      productGrid.displayProductsExtractedFromHash();
    }
  }
  
  //extracts products from hash and displays them
  this.displayProductsExtractedFromHash = function() {
    this.windowHash = this.extractHashData();
    this.markExtractedFilters();
    var pageNumber = this.windowHash['page'][0];
    this.displayGridProducts(pageNumber, productPaginator.productsPerPage, this.sortByFilter);
  }
  
  //marks checkboxes extracted from hash
  this.markExtractedFilters = function() {
    for (var i = 0, len = this.filters.length; i < len; i++) {
      if (this.windowHash[this.filters[i]] != undefined) {
        this.checkHashFilters(this.filters[i]);
      }
    }
  }
  
  //marks filters
  this.checkHashFilters = function(filter) {
    var hashFilters = this.windowHash[filter];
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
  
  //extracts hash from the window hash
  this.extractHashData = function() {
    var urlHash = {};
    var filterHashParams = [];
    var window_hash = window.location.hash;
    var window_hash_params = window_hash.split('#')[1].split('&');
    for (var i = 0, len = window_hash_params.length; i < len; i++) {
      var hashParams = window_hash_params[i].split('=');
      urlHash[hashParams[0]] = hashParams[1];
      var paramValue = hashParams[1];
      var filtersHash = paramValue.split('[')[1].split(']')[0];
      filterHashParams = productGrid.createFilterHashParams(filtersHash);
      urlHash[hashParams[0]] = filterHashParams;
    } 
    return urlHash;
  }
  
  //creates params for individual filter tag to mark them
  this.createFilterHashParams = function(filtersHash) {
    var filterHashParams = [];
    if (filtersHash.indexOf(',') != -1) {
      filterHashParams = filtersHash.split(',');
    }
    else {
      filterHashParams.push(filtersHash);
    }
    return filterHashParams;
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
    productPaginator.highlightPageNumber(this.windowHash['page'])
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