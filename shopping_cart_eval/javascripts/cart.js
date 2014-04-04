function Cart() {
  this.cartItems = {};
  this.totalPrice = 0;

  //updates cart by adding product and updating total
  this.updateCart = function(product, className, $product) {
    if ($product.prop('checked')) {
      this.addCartItemAndUpdatePrice(product, className, $product);
    }
    else {
      this.removeCartItemAndUpdatePrice(product, className, $product);
    }
    this.displayTotal();
  }
  
  //adds item to the cart and updates the total price
  this.addCartItemAndUpdatePrice = function(product, className, $product) {
    var productId = $product.attr('id');
    if (className == 'parent-item') {
      this.cartItems[productId] = new CartItem(product, productId);
      this.cartItems[productId]['accessories'] = {};
      this.cartItems[productId]['productCost'] = product.price;
      this.addCartItemContainer(this.cartItems[productId], $cartContainer, className);
    }
    else {
      var cartItem = new CartItem(product, productId);
      this.cartItems[$product.data('product')]['productCost'] += product.price;
      this.cartItems[$product.data('product')]['accessories'][product.id] = cartItem;
      var $parentProduct = $(".parent-item[data-product='" + $product.data('product') + "']");
      this.addCartItemContainer(cartItem, $parentProduct, className);
    }
    this.totalPrice += product.price;
  }
  
  //removes item to the cart and updates the total price
  this.removeCartItemAndUpdatePrice = function(product, className, $product) {
    var productId = $product.attr('id');
    var parentId = $product.data('product');
    if (className == 'parent-item') {
      this.totalPrice -= this.cartItems[productId]['productCost'];
      delete this.cartItems[productId];
    } 
    else {
      this.cartItems[$product.data('product')]['productCost'] -= product.price;
      this.totalPrice -= product.price;
      delete this.cartItems[$product.data('product')]['accessories'][productId];
    }
    this.removeCartItemContainer(productId, className, parentId);
  }
  
  //displays total of the cart
  this.displayTotal = function() {
    $('#total-amount').text(this.totalPrice);
  }

  //appends product container to cart
  this.addCartItemContainer = function(cartItem, container, className) {
    var itemJson = { "id": cartItem.id, "name": cartItem.name, "price": cartItem.price, "className": className, "category": cartItem.id.split('_')[0] };
    var template = new Template();
    template.display(itemJson, container, template.cartItem);
  }

  //removes product container from the cart
  this.removeCartItemContainer = function(id, className, parentId) {
    if(parentId) {
      $cartContainer.find('.parent-item[data-product="' + parentId + '"]').find(".nested-item[data-product='" + id + "']").remove();
    }
    else {
      $cartContainer.find("img[data-id='" + id + "']").parent().closest("." + className).remove();
    }
  }

  this.bindEvents = function() {
    $('#cart-container').on('click', '.delete-img.parent-item', this.removeParentItemFromCart);
    $('#cart-container').on('click', '.delete-img.nested-item', this.removeAccessoryFromCart);
  }
  
  //removes parent from the cart when clicked on cross button in the cart
  this.removeParentItemFromCart = function() {
    var $product = $('#' + $(this).data('id'));
    $product.prop('checked', !$product.prop('checked')).trigger('change');
  }
  
  //removes accessory from the cart when clicked on cross button in the cart
  this.removeAccessoryFromCart = function() {
    var $cartItem = $(this);
    var $parent = $cartItem.closest('.parent-item');
    var $product = $('#' + $parent.data('product')).parent().find('#' + $cartItem.data('id'));
    $product.prop('checked', !$product.prop('checked')).trigger('change');
  }

  this.bindEvents();
}