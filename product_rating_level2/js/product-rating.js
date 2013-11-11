$(document).ready(function() {
  
  var initialize = init();
  
});

function init() {
  var productratings = new ProductRatings();

  productratings.sendAjaxRequestForProducts();
  productratings.sendAjaxRequestForRatings();
  productratings.displayProductGrid();

  //binds click event on products
  $('#product-grid').delegate('.product-label', "click", function() { productratings.productClick($(this)) });

  //binds click event on ratings
  $('#product-grid').delegate('.ratings', "click", function() { productratings.ratingClick($(this)) });
}

function ProductRatings() {
  var ratings = null, //stores ratings json
    products = null;  //stores products json  
  
  //click function on products
  this.productClick = function($product) {
    $product.toggleClass('highlight').parent('.radioDiv').siblings('.radioDiv').children('.product-label').removeClass('highlight');
    $('.product-label').each(function() {
      if(!$(this).hasClass('highlight')) {
        $('.ratings').removeClass('highlight');
      }
    });
  }

  //click function on ratings
  this.ratingClick = function($rating) {
    $('.product-label').each(function() {
      var $product = $(this);
      if($product.hasClass('highlight')) {
        $rating.toggleClass('highlight').siblings('.ratings').removeClass('highlight');
        var highlightedProductId = $rating.attr('id');
        $product.siblings('li').children('.' + highlightedProductId)
          .prop({ 
            disabled: false,
            checked:true 
          })
          .parent().siblings('li').children()
            .prop({
              checked: false,
              disabled:true
            });
      }
    })
  }
  
  //sends ajax request for products
  this.sendAjaxRequestForProducts = function() {
    $.ajax({
      async: false,
      url: 'json/product-rating1.json',
      dataType: 'json',
      success: function(data) {
        products = data;
      }
    });
  }
  
  //sends ajax request for ratings
  this.sendAjaxRequestForRatings = function() {
    $.ajax({
      async: false,
      url: 'json/product-rating2.json',
      dataType: 'json',
      success: function(data) {
        ratings = data;
      }
    });
  }
  
  //creates product grid with ratings
  this.displayProductGrid = function() {
    this.displayRatings();
    for (var i = 0, len = products.length; i < len; i++) {
      var radioDiv = this.displayProductTags(i);
      
      for (var j = 0, ratingsLength = ratings.length; j < ratingsLength; j++) {
        var radioButton = $('<input type="radio" disabled="true" name=' + products[i] + ">").addClass(ratings[j].id);
        $('<li>').append(radioButton)
          .appendTo(radioDiv);
      }
    }  
  }
  
  ////display product tags
  this.displayProductTags = function(i) {
    var radioDiv = $('<div></div>')
      .appendTo($('#product-grid'))
      .addClass('radioDiv');
    $('<label>').attr('for', products[i])
      .attr('id', products[i])
      .addClass('product-label')
      .html(products[i])
      .appendTo(radioDiv);
    return radioDiv;  
  }
  
  //display rating tags
  this.displayRatings = function() {
    var ratingsDiv = $('<div></div>').appendTo($('#product-grid'))
      .addClass('ratingsDiv');
    for (var j = 0, ratingsLength = ratings.length; j < ratingsLength; j++) {
      $('<label>').attr('for', ratings[j].name)
        .attr('id', ratings[j].id)
        .addClass('ratings')
        .html(ratings[j].name)
        .appendTo(ratingsDiv);
    }
  } 
}