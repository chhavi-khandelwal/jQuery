$(document).ready(function() {
  
  var initialize = init();
  
});

function init() {
  var productratings = new ProductRatings();

  productratings.sendAjaxRequestForProducts();
  productratings.sendAjaxRequestForRatings();
  productratings.displayProductGrid();

  //binds click event on products
  $('#product-grid').delegate('.product-label', "click", productratings.productClick);

  //binds click event on ratings
  $('#product-grid').delegate('.ratings', "click", productratings.ratingClick);
}

function ProductRatings() {
  var ratings = null, //stores ratings json
    products = null;  //stores products json  
  
  //click function on products
  this.productClick = function() {
    var $product = $(this);
    $('.product-label.clicked').removeClass('clicked');
    $product.toggleClass('clicked highlight');
    $('.product-label').not('.clicked').removeClass('highlight');
    if($('.product-label').not('highlight')) {
      $('.ratings').removeClass('highlight');
    }
  }

  //click function on ratings
  this.ratingClick = function() {
    var $rating =$(this);
    $('.highlight').each(function() {
      $rating.toggleClass('highlight').siblings('.ratings').removeClass('highlight');
      var highlightedProductId = $rating.attr('id');
      $(this).siblings('li').children('.' + highlightedProductId)
        .prop({ 
          disabled: false,
          checked:true 
        })
        .parent().siblings('li').children()
          .prop({
            disabled:true
          });
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
        var radioButton = $('<input type="radio" disabled="true">').addClass(ratings[j].id).attr('name',products[i]);
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