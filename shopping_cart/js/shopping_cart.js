$(document).ready(function() {
  var myCart = new MyCart();
  myCart.sendAjaxRequest();
  myCart.showAllProducts();
});

function MyCart() {
  var products = null,
    myCart = this,
    $productGrid = $('#product-grid'),
    $categoryList = $('#category-list'),
    $productsDiv = $('#products-div'),
    $myCartDiv = $('#mycart-div'),
    searchText = $('#search-text'),
    $myCartItems = $('#mycart-items'),
    j = 0,
    cartProducts = [];

    $myCartDiv.hide();
  
  //adds bind event to the select list
  $categoryList.bind('change', function() {
    myCart.createProductGrid($(this));
  });
  
  //adds event to the remove button
  $('#table-row').delegate('.removeButton', 'click', function() {
    var table_row = $(this).parents('div.tab-row');
    var row_id = table_row.attr('id');
    table_row.remove();
    for (var i = 0, len = cartProducts.length; i < len; i++) {
      if (row_id == cartProducts[i].id) {
        cartProducts.splice(i, 1);
        j--;
        myCart.displayTotal();
        break;
      }
    }
    $myCartItems.html("(" + cartProducts.length + ")");
  });
  
  //binds blur event to the textbox after the quantity is changed
  $('#table-row').delegate('.quantity-text', 'blur', function() {
    var quantityBox = $(this);
    var subTotal = myCart.setSubtotal(quantityBox);
    quantityBox.parent().next().html(subTotal);
    myCart.displayTotal();
  });
  
  //calls for addToCart() and checks for the addition to the existing items
  $productGrid.delegate('.addButton', 'click', function() {
    var prod_div = $(this).parents('div.outer-divs');
    var productQuantity = prod_div.find('.quantity-text').val();
    prod_div.find('.quantity-text').val("");
    for (var i = 0, len = cartProducts.length; i < len; i++) {
      if (typeof(parseInt(productQuantity, 10)) == 'number' && parseInt(productQuantity, 10) > 0 && prod_div.attr('id') == cartProducts[i].id) {
        cartProducts[i].quantity += Math.floor(parseInt(productQuantity, 10));
        myCart.displayTotal();
        return;
      }
    }
    myCart.addToCart(prod_div, productQuantity);
    myCart.displayTotal();
    $myCartItems.html("(" + cartProducts.length + ")");
  });
  
  //binds click event to list item of Products
  $('#products').bind('click', function() {
    $productsDiv.show();
    $myCartDiv.hide();
  });

  //binds click event to list item of My Cart
  $('#cart').bind('click', function() {
    $productsDiv.hide();
    $myCartDiv.show();
    $('div.tab-row').remove();
    for (var i = 0, len = cartProducts.length; i < len; i++) {
      var tab_row = $('<div></div>').appendTo($('#table-row'))
        .addClass('tab-row')
        .append('<div class="tab-firstcol"><img class="product-image"/><p></p></div> <div class="prod_price"></div> <div><input type="text" class="quantity-text"></div> <div></div> <div><input type="button" class="removeButton" value="remove"></div>')
      tab_row.children('div').addClass('tab-col').end()
        .attr('id', cartProducts[i].id);
      var firstChild = tab_row.children('div:first');
      firstChild.find('img').attr('src', cartProducts[i].image).end()
        .find('p').html(cartProducts[i].name).end()
        .next('.prod_price').html(cartProducts[i].price)
        .next().children('.quantity-text').val(cartProducts[i].quantity).end()
        .next().html(myCart.productSubTotal(i));
    }
  });
  
  //binds event on search button
  $('#search-box').delegate('#search-button', 'click', function(event) {
    event.preventDefault();
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
  });

  //binds event on clear button
  $('#clear-div').delegate('#clear-button', 'click', function() {
    searchText.val("");
    myCart.createProductGrid($categoryList);
  });
  
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
          cartProducts[j] = products[key][i];
          cartProducts[j]["quantity"] = Math.floor(parseInt(productQuantity, 10));
          j++;
          break;
        } 
      }
    }
  }
  
  //sets total when the quantity is changed in the textbox in the cart
  this.setSubtotal = function(quantityBox) {
    var subTotal;
    var tot_quantity = quantityBox.val();
    var prod_div_id = quantityBox.parents('div.tab-row').attr('id');
    for (var i = 0, len = cartProducts.length; i < len; i++) {
      if (cartProducts[i].id == prod_div_id) {
        if (parseInt(tot_quantity, 10) > 0) {
          cartProducts[i]["quantity"] = Math.floor(parseInt(tot_quantity, 10));
          quantityBox.val(cartProducts[i]["quantity"]);
        }
        else {
          cartProducts[i]["quantity"] = 0;
          quantityBox.val("0");
        }
      subTotal = eval(cartProducts[i]["quantity"] + "*" + quantityBox.parent().siblings('.prod_price').html());
      }
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
  this.productSubTotal = function(i) {
    var subTotal = cartProducts[i].quantity * cartProducts[i].price;
    return subTotal; 
  }
  
  //displays subb total for each product
  this.displayTotal = function() {
    var totalAmount = 0;
    for (var i = 0, len = cartProducts.length; i < len; i++) {
      totalAmount += cartProducts[i].quantity * cartProducts[i].price;
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

}