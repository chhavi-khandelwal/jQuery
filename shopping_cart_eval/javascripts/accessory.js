function Accessory(category, accessory, productId) {
  Product.call(this, category, accessory, 'sub');
  this.productId = productId;

  this.bindEvents = function() {
    var accessorySelector = (".nested-product-checkbox#" + category + "_" + productId + "_acc_" + accessory.id);
    $mainContainer.on('change', accessorySelector, this.addToCart);
  }
  
  //adds accessory to cart
  this.addToCart = function() {
    var $product = $(this);
    var cartNumber = shoppingCart.currentCartNumber;
    shoppingCart.carts[cartNumber].updateCart(accessory, 'nested-item', $(this));
    filter.highlightCartProductInPriceRange();
  }

  this.bindEvents();
}