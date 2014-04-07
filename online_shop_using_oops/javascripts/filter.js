function Filter() {
  var filter = this;
  
  this.bindEvents = function() {
    $mainContainer.on('change', '.range-radio', this.highlightCartProductInPriceRange);
  }
  
  //highlights products in the cart lying in the range selected
  this.highlightCartProductInPriceRange = function() {
    var selectedRange = $('.range-radio:checked');
    var minRangeVal = parseInt(selectedRange.data('min-range'));
    var maxRangeVal = parseInt(selectedRange.data('max-range'));
    $cartContainer.find('div.highlight-range').removeClass('highlight-range');
    filter.matchRangeAndHighlight(minRangeVal, maxRangeVal);
  }
  
  //matches the range and highlights
  this.matchRangeAndHighlight = function(minRangeVal, maxRangeVal) {
    var cartItems = onlineShop.carts[onlineShop.currentCartNumber].cartItems;
    for (var key in cartItems) {
      var productCost = cartItems[key]['productCost'];
      if (minRangeVal <= productCost && productCost <= maxRangeVal) {
        cartItems[key]['domCartItem'].toggleClass('highlight-range');
      }
    }
  }
}