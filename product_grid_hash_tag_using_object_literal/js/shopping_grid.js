var shoppingGrid = {
  gridProducts: [],
  filteredProducts: [],
  filters: ["brand", "color", "sold_out"],

  initialize: function() {
    productGrid.initialize();
  }
};

$(document).ready(function() {
  $paginationContainer = $('#pagination-container');
  $productGrid = $('#product-grid');
  shoppingGrid.initialize();
});