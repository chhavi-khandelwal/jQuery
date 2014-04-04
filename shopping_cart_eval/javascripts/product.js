function Product(category, item, classType) {
  classType = classType || 'super';
  var product = this;
  this.category = category;
  this.id = item.id;
  this.name = item.name;
  this.price = item.price;
  this.accessories = [];

  //prevent subclass to inherit these properties
  if(classType == 'super') {
    
    //initializes accessories of a product
    this.initializeAccessories = function() {
      var accessories = item.accessories;
      if (accessories) {
        for (var key in accessories) {
          this.accessories.push(new Accessory(category, accessories[key], product.id));
        }
      }
    }

    this.bindEvents = function() {
      var productId = '#' + this.category + '_' + this.id;
      $mainContainer.on('change', productId , this.toggleAccessoriesAndUpdateCart);
    }

    //toggle accessories and update cart when clicked on delete button
    this.toggleAccessoriesAndUpdateCart = function() {
      var $product = $(this);
      var cartNumber = shoppingCart.currentCartNumber;
      product.toggleNestedContainer($product);
      shoppingCart.carts[cartNumber].updateCart(product, 'parent-item', $(this));
      filter.highlightCartProductInPriceRange();
    }
    
    //toggles nested products if parent is unchecked or deleted
    this.toggleNestedContainer = function($product) {
      var $nestedContainers = $product.closest('.product').find('.nested-container');
      $nestedContainers.slideToggle();
      if($product.prop('checked') == false) {
        $nestedContainers.find("input[type='checkbox']").prop('checked', false);
      }
    }

    this.initializeAccessories();
    this.bindEvents();
  }
}