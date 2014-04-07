function Accessory(category, accessory, product) {

  Product.call(this, category, accessory, 'sub');
  this.product = product;
  this.domAccessory = null;
  var accessoryItem = this;

  var accessoryTemplate = "<div class='nested-product'><input type='checkbox' class='nested-product-checkbox' id=${ category }_${ productId }_acc_${ id }><label for= ${ category }_${ productId }_acc_${ id }>${ name }</label></div>";

  this.bindEvents = function() {
    var accessorySelector = '#' + this.domAccessory.find('.nested-product-checkbox').attr('id');
    $mainContainer.on('change', accessorySelector, this.updateCart);
  }
  
  //adds accessory to cart
  this.updateCart = function() {
    var cartNumber = onlineShop.currentCartNumber;
    onlineShop.carts[cartNumber].updateAccessoryToCart(accessoryItem);
    filter.highlightCartProductInPriceRange();
  }
  
  //creates html for accessories
  this.createDOMForAccessory = function() {
    var accessoryAttributes = { "id": this.id, "category": this.category.name, "productId": this.product.id, "name": this.name };
    this.domAccessory = onlineShop.createTemplate(accessoryAttributes, accessoryTemplate);
  }

  this.initialize = function() {
    this.createDOMForAccessory();
    this.bindEvents();
  }
  this.initialize();

}