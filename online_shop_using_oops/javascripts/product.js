function Product(category, item, classType) {
  var classType = classType || 'super';
  var product = this;
  this.category = category;
  this.id = item.id;
  this.name = item.name;
  this.price = item.price;
  this.accessories = [];
  this.domProduct = null;
  this.domCheckBox = null;
  var productItemTemplate = "<div class='product'><input type='checkbox' id=${ category }_${ id } class='product-checkbox'><label for= ${ category }_${ id }>${ name }</label></div>";

  //prevent subclass to inherit these properties
  if(classType == 'super') {
    this.createDOMForProduct = function() {
      var productAttributes = { "id": this.id, "name": this.name, "category": this.category.name };
      this.domProduct = onlineShop.createTemplate(productAttributes, productItemTemplate);
      this.domCheckBox = this.domProduct.find('.product-checkbox');
    }
    
    //initializes accessories of a product
    this.initializeAccessories = function() {
      var accessories = item.accessories;
      if (accessories) {
        for (var key in accessories) {
          this.accessories.push(new Accessory(category, accessories[key], product));
        }
        this.displayAccessories();
      }
    }

    this.bindEvents = function() {
      var productSelector = '#' + this.domCheckBox.attr('id');
      $mainContainer.on('change', productSelector, this.toggleAccessoriesAndUpdateCart);
    }
    
    //displays accessories
    this.displayAccessories = function() {
      var accessoryContainer = this.createAccessoryContainer();
      $.each(this.accessories, function(index) {
        accessoryContainer.append(product.accessories[index]['domAccessory']);
      });
      accessoryContainer.hide();
    }

    //creates nested container for accessory
    this.createAccessoryContainer = function() {
      var $productElements = $('#' + this.category.name).find('.product');
      return ($('<div/>', { class: 'nested-container', 'data-id': (this.category.name + '_' + this.id) }).appendTo(this.domProduct));
    }

    //toggle accessories and update cart when clicked on delete button
    this.toggleAccessoriesAndUpdateCart = function() {
      var cartNumber = onlineShop.currentCartNumber;
      product.toggleAccessories();
      onlineShop.carts[cartNumber].updateProductToCart(product);
      filter.highlightCartProductInPriceRange();
    }

    //toggles nested products if parent is unchecked or deleted
    this.toggleAccessories = function() {
      var $nestedContainer = product.domCheckBox.closest('.product').find('.nested-container');
      $nestedContainer.slideToggle();
      if(product.domCheckBox.prop('checked') == false) {
        $nestedContainer.find("input[type='checkbox']").prop('checked', false);
      }
    }

    this.initializeProduct = function() {
      this.createDOMForProduct();
      this.initializeAccessories();
      this.bindEvents();
    }
    this.initializeProduct();
    
  }
}