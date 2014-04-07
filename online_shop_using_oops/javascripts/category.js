function Category(name, categoryJSONUrl) {
  var category = this;
  this.name = name;
  this.products = [];
  
  //initializes products in the category
  this.initializeProducts = function(categoryJSONUrl) {
    var categoryProducts = this.loadData(categoryJSONUrl);
    for (var key in categoryProducts) {
      var product = categoryProducts[key];
      this.products.push(new Product(category, product));
    }
    this.displayProducts();
  }
  
  //displays category products
  this.displayProducts = function() {
    var categoryContainer = this.createCategoryContainer(this.name);
    $.each(this.products, function(index) {
      categoryContainer.append(category.products[index]['domProduct']);
    });
  }

  //creates category container
  this.createCategoryContainer = function(name) {
    var clearButton = $('<input>', { "type": "button", class: "clear-btn", "value": "Clear", id: (name + '-btn') });
    var $productContainer = $('<div/>', {class: 'product-container', id: name}).append(clearButton).appendTo($('#category-dashboard'));
    return $productContainer;
  }

  this.bindEvents = function() {
    $mainContainer.on('click', '#' + this.name + '-btn.clear-btn', this.removeAllAssociatedProducts);
    $mainContainer.on('mouseenter', ('#' + this.name), this.highlightSelectedProduct);
    $mainContainer.on('mouseleave', ('#' + this.name), this.dehighlightSelectedProduct);
  }
  
  //removes all associated products with the category once clicked on clear button
  this.removeAllAssociatedProducts = function() {
    $.each(category.products, function(index) {
      var categoryProduct = category.products[index]['domCheckBox'];
      if (categoryProduct.prop('checked')) {
        categoryProduct.prop('checked', false).trigger('change');
      }
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

  
  //highlights selected products in the category containers
  this.highlightSelectedProduct = function() {
    $cartContainer.find('.' + category.name).addClass('highlight');
  }
  
  //dehighlights selected products in the category containers
  this.dehighlightSelectedProduct = function() {
    $cartContainer.find('.' + category.name).removeClass('highlight');
  }

  this.initialize = function() {
    this.initializeProducts(categoryJSONUrl);
    this.bindEvents();
  }
  this.initialize();

}