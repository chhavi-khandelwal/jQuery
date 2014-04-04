function Template() {
  this.cartItem = "<div class=${ className } data-category=${ category } data-product=${ id }><p><img src='delete.png' class='delete-img ${ className }' data-id=${ id }></p><p class='product-name'>${ name }</p><p class='product-price'>${ price }</p></div>",

  this.productItem = "<div class='product'><input type='checkbox' id=${ category }_${ id } class='product-checkbox'><label for= ${ category }_${ id }>${ name }</label></div>",

  this.nestedProductItem = "<div class='nested-product'><input type='checkbox' class='nested-product-checkbox' id=${ category }_${ productId }_acc_${ id } data-product= ${ category }_${ productId }><label for= ${ category }_${ productId }_acc_${ id }>${ name }</label></div>"

  // display html templates acc. to their call
  this.display = function(productCollection, container, template) {
    $.template("productTemplate", template);
    $.tmpl("productTemplate", productCollection).appendTo(container);
  }
}