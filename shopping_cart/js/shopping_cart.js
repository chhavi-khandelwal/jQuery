$(document).ready(function() {
  var initialize = new init();
});

function init() {
  var myCart = new MyCart();

  myCart.sendAjaxRequest();
  myCart.showAllProducts();
  myCart.bindEvents();
}

function MyCart() {
  var products = null,
    myCart = this,
    $productGrid = $('#product-grid'),
    $categoryList = $('#category-list'),
    $productsDiv = $('#products-div'),
    $myCartDiv = $('#mycart-div'),
    $tableRow = $('#table-row'),
    searchText = $('#search-text'),
    $myCartItems = $('#mycart-items'),
    cartProducts = [];

  $myCartDiv.hide();
  
  //works on changing the list category
  this.listOptionChange = function($this) {
    myCart.createProductGrid($this);
  }
  
  //when clicked on My cart option
  this.cartListClick = function() {
    $productsDiv.hide();
    $myCartDiv.show();
    $('div.tab-row').remove();
    for (var key in cartProducts) {
      var tab_row = $('<div></div>').appendTo($('#table-row'))
        .addClass('tab-row')
        .append('<div class="tab-firstcol"><img class="product-image"/><p></p></div> <div class="prod_price"></div> <div><input type="text" class="quantity-text"></div> <div class="subtotal-text"></div> <div><input type="button" class="removeButton" value="remove"></div>')
      tab_row.children('div').addClass('tab-col').end()
        .attr('id', key);
      var firstChild = tab_row.children('div:first');
      firstChild.find('img').attr('src', cartProducts[key].image).end()
        .find('p').html(cartProducts[key].name).end()
        .nextAll('.prod_price').html(cartProducts[key].price)
        .next().children('.quantity-text').val(cartProducts[key].quantity).end()
        .nextAll('.subtotal-text').html(myCart.productSubTotal(key));
    }
  }

  //when clicked on clear button
  this.clearButtonClick = function() {
    searchText.val("");
    myCart.createProductGrid($categoryList);
  }
  
  //removes product from mycart
  this.removeFromCart = function($removeButton) {
    var table_row = $removeButton.parents('div.tab-row');
    var row_id = table_row.attr('id');
    table_row.remove();
    if (cartProducts[row_id]) {
      delete cartProducts[row_id];
      myCart.displayTotal();
    }
    $myCartItems.html("(" + Object.keys(cartProducts).length + ")");
  }
  
  //updates the product quantity when changed from mycart
  this.updateQuantity = function($this) {
    var quantityBox = $this;
    var subTotal = myCart.setSubtotal(quantityBox);
    quantityBox.parent().next().html(subTotal);
    myCart.displayTotal();
  }
  
  //searches the product from all products
  this.searchProduct = function() {
    var selectedCategory = $categoryList.val();
    $productGrid.html("");
    var searchVal = searchText.val().toLowerCase();
    for (var key in products) {
      for (var i = 0, len = products[key].length; i < len; i++) {
        var name = products[key][i].name.toLowerCase();
        if ((key == selectedCategory && name.indexOf(searchVal) != -1) || (selectedCategory == 'all' && name.indexOf(searchVal) != -1)) {
          var outerDiv = myCart.createProductContainer();
          myCart.showProductGrid(outerDiv, i, key);
        }
      }
    }
  }
  
  //displays all products from the category selected when clicked on the product ul
  this.productListClick = function() {
    $productsDiv.show();
    $myCartDiv.hide();
  }
  
  //updates quantity and subtotal
  this.addButtonClick = function($addButton) {
    var prod_div = $addButton.parents('div.outer-divs');
    var productQuantity = prod_div.find('.quantity-text').val();
    prod_div.find('.quantity-text').val("");
    if (typeof(parseInt(productQuantity, 10)) == 'number' && parseInt(productQuantity, 10) > 0) {
      if (cartProducts[prod_div.attr('id')]) {
        cartProducts[prod_div.attr('id')].quantity += Math.floor(parseInt(productQuantity, 10));
        productQuantity = cartProducts[prod_div.attr('id')].quantity;
        myCart.displayTotal();
      }  
    }
    myCart.addToCart(prod_div, productQuantity);
    myCart.displayTotal();
    $myCartItems.html("(" + Object.keys(cartProducts).length + ")");
  }

  //sends ajax request to get data from json
  this.sendAjaxRequest = function() {
    $.ajax({
      async: false,
      url: 'json/shopping_cart.json',
      dataType: 'json',
      success: function(data) {
        products = data;
      }
    });
  }
  
  //adds items to the cart
  this.addToCart = function(prod_div, productQuantity) {
    for (var key in products) {
      for (var i = 0, len = products[key].length; i < len; i++) {
        if (typeof(parseInt(productQuantity, 10)) == 'number' && parseInt(productQuantity, 10) > 0 && prod_div.attr('id') ==  products[key][i]['id']) {
          cartProducts[products[key][i]['id']] = {"name": products[key][i]['name'], "price": products[key][i]['price'], "image": products[key][i]['image'], "quantity": Math.floor(parseInt(productQuantity, 10))};
          return;
        } 
      }
    }
  }
  
  //sets total when the quantity is changed in the textbox in the cart
  this.setSubtotal = function(quantityBox) {
    var subTotal;
    var tot_quantity = quantityBox.val();
    var prod_div_id = quantityBox.parents('div.tab-row').attr('id');
    if (cartProducts[prod_div_id] != undefined) {
      if (parseInt(tot_quantity, 10) > 0) {
        cartProducts[prod_div_id]["quantity"] = Math.floor(parseInt(tot_quantity, 10));
        quantityBox.val(cartProducts[prod_div_id]["quantity"]);
      }
      else {
        cartProducts[prod_div_id]["quantity"] = 0;
        quantityBox.val("0");
      }
      subTotal = eval(cartProducts[prod_div_id]["quantity"] + "*" + quantityBox.parent().siblings('.prod_price').html());
    }
    return subTotal;
  }
  
  //display all products initially when the page is loaded
  this.showAllProducts = function() {
    for (var key in products) {
      this.showSelectedProducts(key);    
    }
  }
  
  //creates product list according to the category selected
  this.createProductGrid = function(listOption) {
    $productGrid.html("");
    var key = listOption.val();
    if(products[key]) {
      this.showSelectedProducts(key);
    }
    else {
      this.showAllProducts();
    } 
  }
  
  //calculates and returns sub total of each product
  this.productSubTotal = function(key) {
    var subTotal = cartProducts[key].quantity * cartProducts[key].price;
    return subTotal; 
  }
  
  //displays subb total for each product
  this.displayTotal = function() {
    var totalAmount = 0;
    for (var key in cartProducts) {
      totalAmount += cartProducts[key].quantity * cartProducts[key].price;
    }
    $('#amount-div').html(totalAmount);
    $('#cart-amount-div').html(totalAmount);
  }
  
  //displays product list according to the category selected
  this.showSelectedProducts = function(key) {
    for (var i = 0, len = products[key].length; i < len; i++) {
      var outerDiv = this.createProductContainer();
      this.showProductGrid(outerDiv, i, key);
    }
  }
  
  //displays the whole grid
  this.showProductGrid = function(outerDiv, i, key) {
    var innerDivs = outerDiv.children('div.inner-divs:first');
    innerDivs.find('img').attr('src',products[key][i].image).end()
      .next().html(products[key][i].name + '<br>Category: ' + key + '<br>' + products[key][i].description + '<br>Price: Rs.' + products[key][i].price);
    outerDiv.attr('id', products[key][i].id);
  }
  
  //creates container for each product displayed on the page
  this.createProductContainer = function() {
    var outerDiv = $('<div></div>').appendTo($productGrid)
      .append($('<div><img class="product-image"/></div> <div></div> <div>Quantity: <input type="text" class="quantity-text"></div>    <div><input type="button" class="addButton" value="Add To Cart"></div>'))
      .addClass('outer-divs');
    outerDiv.children('div').addClass('inner-divs');
    return outerDiv;
  }

  //reloads cart
  this.reloadCart = function() {
    location.reload();
  }
  
  //binds events
  this.bindEvents = function() {
    //adds bind event to the select list
    $categoryList.bind('change', function() { myCart.listOptionChange($(this)) });
    
    //adds event to the remove buttonvar myCart = new MyCart();
    $tableRow.delegate('.removeButton', 'click', function() { myCart.removeFromCart($(this)); });
    
    //binds blur event to the textbox after the quantity is changed
    $tableRow.delegate('.quantity-text', 'blur', function() { myCart.updateQuantity($(this)); });
    
    //calls for addToCart() and checks for the addition to the existing items
    $productGrid.delegate('.addButton', 'click', function() { myCart.addButtonClick($(this)); });
    
    //binds click event to list item of Products
    $('#products').bind('click', myCart.productListClick);

    //binds click event to list item of My Cart
    $('#cart').bind('click', myCart.cartListClick);

    //binds event on search button
    $('#search-box').delegate('#search-button', 'click', function(event) {
      event.preventDefault();
      myCart.searchProduct();
    });
     
    //binds event on clear button
    $('#clear-div').delegate('#clear-button', 'click', myCart.clearButtonClick);
    
    //reloads page
    $('#main-container').delegate('.checkout', 'click', myCart.reloadCart);
  }
}