$(document).ready(function() {
	var moduleDivs = $('div.module');
	//Hide all of the modules. 
  moduleDivs.hide();

  var firstModule = moduleDivs.first();
  //Create an unordered list element before the first module. 
  $('<ul></ul>').insertBefore(firstModule);
  
  var unorderedList = firstModule.prev();
  //use the text of the h2 element as the text for a list item that you add to the unordered list element. 
  moduleDivs.each(function() {
  	var $this = $(this);
  	var listItem = $('<li>' + $(this).find('h2').text() + '</li>');
  	listItem.appendTo(unorderedList);

  //Bind a click event to the list item
  	listItem.bind('click', function() {
      listItem.addClass('current').siblings().removeClass('current');
      $this.show().siblings('.module').hide();
  	});
  });
  
  //show the first tab. 
  unorderedList.children().eq(0).addClass('current').siblings().removeClass('current');
  moduleDivs.eq(0).show() 
});