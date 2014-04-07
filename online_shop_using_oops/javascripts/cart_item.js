function CartItem(product, productId) {
  this.id = 'cartItem_' + productId;
  this.price = product.price;
  this.name = product.name;
  this.product = product;
  this.domCartItem = null;
  this.domRemoveButton = null;

  var cartItemTemplate = "<div class='${ className } ${ category }' id=${ id }><p><img src='delete.png' class='delete-img' id=delete_${ id }></p><p class='product-name'>${ name }</p><p class='product-price'>${ price }</p></div>";
  
  //creates html for cart item
  this.createDOMForCartItem = function(className) {
    var cartItemAttributes = { "id": this.id, "name": this.name, "price": this.price, "className": className, "category": this.product.category.name };
    this.domCartItem = onlineShop.createTemplate(cartItemAttributes, cartItemTemplate);
    this.domRemoveButton = this.domCartItem.find('#delete_' + this.id);
  }
  
  //add dom of item to cart
  this.addItemToCart = function(className, container) {
    this.createDOMForCartItem(className);
    this.domCartItem.appendTo(container);
    this.bindEvents();
  }
  
  //remove dom of item to cart
  this.removeItemFromCart = function() {
    this.domCartItem.remove();
    this.unbindEvents();
  }
  
  //trigger unchecking of checkboxes once clicked on delete image
  this.uncheckItems = function() {
    $('#' + productId).prop('checked', false).trigger('change');
  }

  this.unbindEvents = function() {
    $('#cart-container').off('click', '#' + this.domRemoveButton.attr('id'), this.uncheckItems);
  }

  this.bindEvents = function() {
    $('#cart-container').on('click', '#' + this.domRemoveButton.attr('id'), this.uncheckItems);
  }

}