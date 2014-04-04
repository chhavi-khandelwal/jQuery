function Category(name, categoryJSONUrl) {
  this.name = name;
  this.products = [];
  
  //initializes products in the category
  this.initializeProducts = function(categoryJSONUrl) {
    var categoryProducts = this.loadData(categoryJSONUrl);
    for (var key in categoryProducts) {
      var product = categoryProducts[key];
      this.products.push(new Product(this.name, product));
    }
  }

  this.bindEvents = function() {
    this.clearAllListener();
    $mainContainer.on('mouseenter', ('#' + this.name), this.highlightSelectedProduct);
    $mainContainer.on('mouseleave', ('#' + this.name), this.dehighlightSelectedProduct);
  }
  
  //unckecks all when clicked on clear button
  this.clearAllListener = function() {
    var category = this; 
    $('#main-container').on('click', '#' + this.name + '-btn.clear-btn', function() {
      $('#' + category.name).find('.product-checkbox:checked').prop('checked', false).trigger('change');
    });
  }

  //loads data from the json
  this.loadData = function(categoryJSONUrl) {
    var productsCollection = null;
    $.ajax({
      async: false,
      url: categoryJSONUrl,
      dataType: 'json',
      success: function(data) {
        productsCollection = data;
      }
    });
    return productsCollection;
  }

  this.initializeProducts(categoryJSONUrl);
  
  //highlights selected products in the category containers
  this.highlightSelectedProduct = function() {
    var category = $(this).attr('id').split('#')[0];
    $cartContainer.find("div[data-category='" + category + "']").addClass('highlight');
  }
  
  //dehighlights selected products in the category containers
  this.dehighlightSelectedProduct = function() {
    var category = $(this).attr('id').split('#')[0];
    $cartContainer.find("div[data-category='" + category + "']").removeClass('highlight');
  }

  this.bindEvents();

}