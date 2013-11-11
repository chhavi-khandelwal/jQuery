$(document).ready(function() {
  var initialize = new init();
});

function init() {
  var  $uploadDiv = $('#upload-file-div');
    fileUploader = new FileUploader(5, $uploadDiv);

  fileUploader.createFileAttachmentContainer();

  //adds click event to delete file button
  $uploadDiv.delegate('.crossImage', 'click', function() { fileUploader.deleteFileContainer($(this)); });
  
  //adds click event to "add more files" link
  $uploadDiv.delegate('#addLink', 'click', function() { fileUploader.addFileContainer(); return false; });
}

function FileUploader(max_attachments, $uploadDiv) {

  this.max_attachments = max_attachments;
    var uploadCount = 0,
      fileUploader = this,
      $uploadDiv = $uploadDiv;

  //deletes file container    
  this.deleteFileContainer = function($deleteImage) {
    if ($('.fileContainer:visible').length != 1) {
      $deleteImage.parents('.fileContainer').hide().find('input[type="file"]').val("");
    }
    $('#addLink').attr('href', '#');
  }
    
  //adds new file div
  this.addFileContainer = function() {
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
  }  
  
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
}