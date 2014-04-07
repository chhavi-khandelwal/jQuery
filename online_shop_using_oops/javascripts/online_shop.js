//Main Class of online shop
function OnlineShop() {
  
  var categoriesJSONUrlCollection = { "footwear": 'json/footwear.json', "apparel": 'json/apparel.json', "electronic": 'json/electronic.json' };
  this.currentCartNumber = 0;
  this.categories = {};
  this.carts = {};

  this.initialize = function() {
    this.createCart();
    this.createCategoryProductsGrid();
    filter.bindEvents();
  }
  
  this.createCategoryProductsGrid = function() {
    for (var key in categoriesJSONUrlCollection) {
      var categoryJSONUrl = categoriesJSONUrlCollection[key];
      //create categories 
      this.categories[key] = new Category(key, categoryJSONUrl);
    }
  }
  
  //creates template
  this.createTemplate = function(productAttributes, template) {
    $.template("productTemplate", template);
    return $.tmpl("productTemplate", productAttributes);
  }
  
  //creates cart by initializing the object
  this.createCart = function() {
    this.carts[this.currentCartNumber] = new Cart();
  }
}

$(document).ready(function() {
  $mainContainer = $('#main-container');
  $cartContainer = $('#cart-container');
  onlineShop = new OnlineShop();
  filter = new Filter();
  onlineShop.initialize();
});