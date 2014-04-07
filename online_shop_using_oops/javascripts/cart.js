function Cart() {
  this.cartItems = {};
  this.totalPrice = 0;

  //updates cart by adding product and updating total
  this.updateProductToCart = function(product) {
    var productId = product.category.name + '_' + product.id;
    if (this.cartItems[productId]) {
      this.removeProductItemAndUpdateTotal(productId, product);
    }
    else {
      this.addProductItemAndUpdateTotal(productId, product);
    }
    this.displayTotal();
  }
  
  // updates cart by adding accessory and updating total
  this.updateAccessoryToCart = function(accessory) {
    var accessoryId = accessory.category.name + '_' + accessory.product.id + '_acc_' + accessory.id;
    if (this.cartItems[accessoryId]) {
      this.removeAccessoryAndUpdateTotal(accessoryId, accessory);
    }
    else {
      this.addAccessoryAndUpdateTotal(accessoryId, accessory);
    }
    this.displayTotal();
  }
  
  //removes parent product and updates total
  this.removeProductItemAndUpdateTotal = function(productId, product) {
    this.cartItems[productId].removeItemFromCart();
    this.totalPrice -= product.price;
    this.removeAssociatedAccessoriesFromCart(product, productId);
    delete this.cartItems[productId];
  }
  
  //adds parent product and updates total
  this.addProductItemAndUpdateTotal = function(productId, product) {
    this.cartItems[productId] = new CartItem(product, productId);
    this.cartItems[productId].addItemToCart('parent-item', $cartContainer);
    this.cartItems[productId]['productCost'] = product.price;
    this.totalPrice += product.price; 
  }

  //adds accessory and updates total
  this.addAccessoryAndUpdateTotal = function(accessoryId, accessory) {
    var accessoryParent = accessory.category.name + '_' + accessory.product.id;
    this.cartItems[accessoryId] = new CartItem(accessory, accessoryId);
    this.cartItems[accessoryId].addItemToCart('nested-item', $('#cartItem_' + accessoryParent));
    this.cartItems[accessoryParent]['productCost'] += accessory.price;
    this.totalPrice += accessory.price; 
  }

  //removes accessory and updates total
  this.removeAccessoryAndUpdateTotal = function(accessoryId, accessory) {
    this.cartItems[accessoryId].removeItemFromCart();
    this.totalPrice -= accessory.price;
    delete this.cartItems[accessoryId];
  }

  //removes accessories associated with the parent product and updates total
  this.removeAssociatedAccessoriesFromCart = function(product, productId) {
    for (var key in product.accessories) {
      var productAccessory = productId + '_acc_' + product.accessories[key]['id'];
      if (this.cartItems[productAccessory]) {
        this.cartItems[productAccessory].unbindEvents();
        this.totalPrice -= product.accessories[key]['price'];
        delete this.cartItems[productAccessory];
      }
    }
  }

  //displays total of the cart
  this.displayTotal = function() {
    $('#total-amount').text(this.totalPrice);
  }

}