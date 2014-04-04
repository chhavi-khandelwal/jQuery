//Main Class of shopping cart
function ShoppingCart() {
  
  var categoriesJSONUrlCollection = { "footwear": 'json/footwear.json', "apparel": 'json/apparel.json', "electronic": 'json/electronic.json' };
  this.currentCartNumber = 0;
  this.categories = {};
  this.carts = {};

  this.initialize = function() {
    this.createCart();
    this.createCategoryProductsGrid();
    this.hideAccessories();
    filter.bindEvents();
  }

  this.createCategoryProductsGrid = function() {
    for (var key in categoriesJSONUrlCollection) {
      var categoryJSONUrl = categoriesJSONUrlCollection[key];
      //create categories and its products
      this.categories[key] = new Category(key, categoryJSONUrl);
      this.displayAllProducts(this.categories[key]);
    }
  }
  
  //creates cart by initializing the object
  this.createCart = function() {
    this.carts[this.currentCartNumber] = new Cart();
  }

  //displays products in html from json
  this.displayAllProducts = function(category) {
    var categoryContainer = this.createCategoryContainer(category.name);
    var template = new Template();
    template.display(category.products, categoryContainer, template.productItem);
    this.displayProductAccessories(category, template);
  }
  
  //displays Product Accessories if present
  this.displayProductAccessories = function(category, template) {
    var product_count = 0;
    for (var key in category.products) {
      var product = category.products[key];
      var accessories = product.accessories;
      if (accessories) {
        var nestedContainer = this.createAccessoryContainer(product_count, category.name, product.id); 
        template.display(accessories, nestedContainer, template.nestedProductItem);
        product_count++;
      }
    }
  }
  
  //creates nested container for accessory
  this.createAccessoryContainer = function(product_count, categoryName, productId) {
    var $productElements = $('#' + categoryName).find('.product');
    return ($('<div/>', { class: 'nested-container', 'data-id': (categoryName + '_' + productId) }).appendTo($productElements[product_count]));
  }

  //creates product container
  this.createCategoryContainer = function(id) {
    var clearButton = $('<input>', { "type": "button", class: "clear-btn", "value": "Clear", id: (id + '-btn') });
    var $productContainer = $('<div/>', {class: 'product-container', id: id}).append(clearButton).appendTo($('#category-dashboard'));
    return $productContainer;
  }
  
  //hides accessory when page is loaded
  this.hideAccessories = function() {
    $('.nested-container').hide();
  }
}

$(document).ready(function() {
  $mainContainer = $('#main-container');
  $cartContainer = $('#cart-container');
  shoppingCart = new ShoppingCart();
  filter = new Filter();
  shoppingCart.initialize();
});