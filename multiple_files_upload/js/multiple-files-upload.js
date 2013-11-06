$(document).ready(function() {
  var fileUploader = new FileUploader(5);
  fileUploader.createFileAttachmentContainer();
});

function FileUploader(max_attachments) {

  this.max_attachments = max_attachments;
  var uploadCount = 0,
    fileUploader = this,
    $uploadDiv = $('#upload-file-div');
   
  //creates file attachment container
  this.createFileAttachmentContainer = function() {
    fileUploader.createChooseFileContainer();
    fileUploader.createAddFileLink();
  }
  
  //creates choose file container
  this.createChooseFileContainer = function() {
    for (var i = 0; i < this.max_attachments; i++) {
      var $fileContainer = $('<div>')
        .attr('id', 'fileContainer' + i)
        .addClass('fileContainer')
        .appendTo($uploadDiv);
      var chooseButton = $('<input type="file">')
        .attr('value', 'Choose File')
        .addClass('chooseButton');
      var crossImage = $('<img/>')
        .attr('src', 'images/image1.png')
        .addClass('crossImage');
      var chooseImageDiv = $('<div>')
        .addClass('chooseFileDiv')
        .append(chooseButton)
        .appendTo($fileContainer);
      chooseImageDiv.after(crossImage);
      if (i != 0) {
        $fileContainer.hide();
      }
    }
  }

  //creates "add more files" link
  this.createAddFileLink = function() {
    $('<div>').attr('id', 'addFileDiv')
      .append($('<img /><a></a>'))
      .appendTo($uploadDiv);
    $('#addFileDiv').find('img')
      .attr({id: 'addImage',
        src: 'images/image2.png'}).end()
    .find('a').attr({ href: '#',
      id: 'addLink'})
     .html('Add more files');
  }
  
  //adds click event to delete file button
  $uploadDiv.delegate('.crossImage', 'click', function(index) {
    if ($('.fileContainer:visible').length != 1) {
      $(this).parents('.fileContainer').hide().find('input[type="file"]').val("");
    }
    $('#addLink').attr('href', '#');
  });
  
  //adds click event to "add more files" link
  $uploadDiv.delegate('#addLink', 'click', function() {
    var count = 0;
    $('.fileContainer:hidden').each(function(index) {
      if (index == 0) {
        $(this).show();
      }
      count++;
    });
    if (count == 1) {
      $('#addLink').removeAttr('href');
    }
    return false;
  });

}