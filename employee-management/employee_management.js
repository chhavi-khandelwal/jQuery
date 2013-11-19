$(document).ready(function() {
  var initialize = init();
});

function init() {
  var employeeRecord = new EmployeeRecord();
  employeeRecord.createRecordManager();
}

function EmployeeRecord() {
  var employeeNames = null,
    roleHeaders = null,
    namesList = [],
    employeeRecord = this;

  this.createRecordManager = function() {
    employeeNames = this.sendAjaxRequest('json/employee_management2.json');
    this.displayEmployeesBlock();
    roleHeaders = this.sendAjaxRequest('json/employee_management1.json');
    this.displayRolesBlock();
    this.displaytodosBlock();
    this.dragName();
    this.bindEvents();
  }  

  this.sendAjaxRequest = function(findUrl) {
    var dataColection = null;
    $.ajax({
      async: false,
      url: findUrl,
      dataType: 'json',
      success: function(data) {
        dataColection = data;
      }
    });
    return dataColection;
  }

  this.displayEmployeesBlock = function() {
    for (var key in employeeNames) {
    var empList =  $('<li></li>').appendTo($('#employee-list'))
      .html(employeeNames[key]["name"])
      .attr('id', employeeNames[key]["id"])
      .attr('uniqueattr', employeeNames[key]["name"])
      .addClass('employeename');
    $('<img/>').prependTo(empList)
      .addClass('delEmpButton')
      .attr('src', 'delete.png')
      .attr('ButtonIndex', employeeNames[key]["id"]).hide(); 
    }
  }

  this.addDeleteButton = function() {
    var $listName = $(this);
    $('.delEmpButton').each(function() {
      var $delEmpButton = $(this);
      if ($delEmpButton.attr('ButtonIndex') == $listName.attr('id')) {
        $delEmpButton.toggle();
      }
    })
  }
 
  this.displayRolesBlock = function() {
    for (var i = 0; i < roleHeaders.length; i++) {
      var roleHeadersDiv = $('<div></div>').appendTo($('#roles'))
        .html(roleHeaders[i])
        .addClass('roleHeadersDiv');
      $('<ul></ul>').appendTo(roleHeadersDiv)
        .attr('id', roleHeaders[i])
        .addClass('role-headers');
    }
  }

  this.dragName = function() {
    $('.employeename').draggable({
      helper : "clone",
      revert : "invalid",
      drag : function(event, ui) {
        var target = event.target;
        var employeeName = $(target).attr('uniqueattr');
        employeeRecord.dropName(employeeName, target);
      }
    });
  }

  this.dropName = function(employeeName, target) {
    $('.roleHeadersDiv').droppable({
      drop: function() {
        var nameList = $(this).find('ul');
        var empId = $(target).attr('id');
        var employeeId = nameList.attr('id') + empId;
        if (nameList.find('li').length == 0) {
          var empNode = employeeRecord.makeListName(employeeName, target);
          employeeRecord.appendNameToRoles(nameList, employeeId, empNode);
          employeeRecord.appendNameTotodos(empNode, employeeName, target);
        }
        else {
          if (namesList[employeeId] == undefined) {
            var empNode = employeeRecord.makeListName(employeeName, target);
            employeeRecord.appendNameToRoles(nameList, employeeId, empNode);
            employeeRecord.appendNameTotodos(empNode, employeeName, target);
          }
        }
      }
    });
  }

  this.appendNameTotodos = function(empNode, employeeName, target) {
    var targetRoleHead = empNode.attr('rolehead');
    var uniqueattr = $(target).attr('uniqueattr');
    $('.todos-div').each(function() {
      if ($(this).attr('role-header') == targetRoleHead) {
        var roleDiv = $('<div class="roleDiv"></div>').appendTo($(this))
          .attr('distinct', empNode.attr('id'))
          .attr('uniqueattr', uniqueattr);
        var divCollection = $('<div class="empname"></div>')
          .appendTo(roleDiv)
          .html(employeeName);
        var addButton = $('<img/>')
          .addClass('addButton right')
          .attr('src', 'addButton.jpg');  
        var todoList = $('<div class="todolist"></div>')
          .appendTo(roleDiv)
          .html("Add ToDos for " + employeeName + " here")
          .append(addButton);
        $('<div></div>').appendTo(todoList)
          .addClass('todoContainer');
      }
    })
  }
  
  this.appendNameToRoles = function(nameList, employeeId, empNode) {
    nameList.append(empNode);
    empNode.attr('rolehead', nameList.attr('id'))
      .attr('id', employeeId)
      .addClass('onDeskEmployee');
    namesList[employeeId] = {"id": employeeId};   

  }

  this.makeListName = function(employeeName, target) {
    var uniqueattr = $(target).attr('uniqueattr');
    var empNode = $('<li></li>')
      .html(employeeName)
      .attr('uniqueattr', uniqueattr);
      $('<img class="del-image" src="delete.png"/>').prependTo(empNode).hide();
    return empNode;
  }
  
  this.displaytodosBlock = function() {
    $('<img/>').appendTo('#todos')
      .addClass('slideDown right')
      .attr('src', 'addButton.jpg');
    $('<img/>').appendTo('#todos')
      .addClass('slideUp right')
      .attr('src', 'min.jpg');
    for (var i = 0; i < roleHeaders.length; i++) {
      var slideButton = $('<img/>')
        .addClass('slideShow right')
        .attr('src', 'expand-collapse.png');
      var todoDiv = $('<div></div>').appendTo('#todos')
        .addClass('todos-div')
        .attr('role-header', roleHeaders[i]);
      $('<div></div>').appendTo(todoDiv)
        .html(roleHeaders[i])
        .addClass('todoDivHeading')
        .append();
    }   
  }

  this.hoverName = function() {
    $(this).find('img').show();
  }

  this.mouseOutList = function() {
    $(this).find('img').hide();
  }

  this.deleteName = function() {
    var name = $(this).closest('li');
    var nameId = name.attr('id');
    if (employeeRecord.askForConfirmation()) {
      if (namesList[nameId]) {
        delete namesList[nameId];     
      }
      name.remove();
      $('.roleDiv').each(function() {
        var $roleDiv = $(this);
        if (nameId == $roleDiv.attr('distinct')) {
          $roleDiv.remove();
        }
      })
    }
  }

  this.showRecord = function() {
    var empData = $(this).closest('.todos-div').find('.roleDiv');
    if (empData.length > 0) {
      empData.slideToggle();
    }
  }

  this.addTodoContainer = function() {
    var todoContainer = $(this).siblings('.todoContainer');
    if (todoContainer.find('.todoListCont').length >= 3) {
      todoContainer.addClass('scrollDiv');
    }
    else {
      todoContainer.removeClass('scrollDiv');
    }
    var todoListCont = $('<div></div>').appendTo(todoContainer)
      .addClass('todoListCont');  
    $('<input type="text">').appendTo(todoListCont)
      .addClass('todoText');
    $('<img/>').appendTo(todoListCont)
      .addClass('saveText')
      .attr('src', 'save.jpg');
    $($('<img/>')).appendTo(todoListCont)
      .addClass('removeText')
      .attr('src', 'delete.png');
  }

  this.saveTodo = function() {
    var $saveButton = $(this);
    var textContainer = $saveButton.siblings('.todoText');
    var textVal = textContainer.val();
    var todoListCont = $saveButton.closest('.todoListCont');
    if (textVal.trim()) {
      $saveButton.remove();
      $('<img/>').insertAfter(textContainer)
        .attr('src', 'edit.png')
        .addClass('editButton');
      $('<div></div>').prependTo(todoListCont)
        .html(textVal)
        .addClass('todoTextDiv');
      textContainer.hide();
     }
  }

  this.removeTodo = function() {
    $(this).closest('.todoListCont').remove();
  }

  this.editTodo = function() {
    var $editButton = $(this);
    var textContainer = $editButton.siblings('.todoTextDiv');
    var textVal = textContainer.val();
    var textInputContainer = $editButton.siblings('.todoText');
    var todoListCont = $editButton.closest('.todoListCont');
    $editButton.remove();
    $('<img/>').insertAfter(textInputContainer)
      .attr('src', 'save.jpg')
      .addClass('saveText');
    textInputContainer.show();
    textContainer.hide();   
  }

  this.deleteRecords = function() {
    if (employeeRecord.askForConfirmation()) {
      var $delButton = $(this);
      var $empRecord = $delButton.closest('.employeename');
      var uniqueattr = $empRecord.attr('uniqueattr');
      $('.roleDiv').each(function() {
        var $roleDiv = $(this);
        if ($roleDiv.attr('uniqueattr') == uniqueattr) {
          $roleDiv.remove();
        }
      });

      $('#roles').find('li').each(function() {
        var $listName = $(this);
        if ($listName.attr('uniqueattr') == uniqueattr) {
          $listName.remove();
        }
      });
      $empRecord.remove();
    }
  }
  
  this.askForConfirmation = function() {
    var confirmFlag = confirm("Do you want to delete the record?");
    return confirmFlag;
  }

  this.searchTodo =function() {
    var searchVal = parseInt($('#search').val(), 10);
    if ($.type(searchVal) == "number" && searchVal > 0) {
      $('.todoContainer').each(function() {
        var $todoContainer = $(this);
        var todoCount = $todoContainer.children('.todoListCont').length;
        if (searchVal == todoCount) {
          $todoContainer.closest('.roleDiv').slideDown();
          var $employeeNameHeader = $todoContainer.parents('.todolist').siblings('.empname');
          $employeeNameHeader.stop().css("background-color", "red").animate({ backgroundColor: "white"}, 1500);
        }
        else {
          $todoContainer.closest('.roleDiv').slideUp();
        }
      })
    }
  }

  this.slideUpTodos = function() {
    $('.roleDiv').slideUp();
  }

  this.slideDownTodos = function() {
    $('.roleDiv').slideDown();
  }

  this.bindEvents = function() {
    var $roles = $('#roles'),
      $todos = $('#todos'),
      $employees = $('#employees');

    $roles.delegate('li', "mouseenter", employeeRecord.hoverName);
  
    $roles.delegate('li', "mouseleave", employeeRecord.mouseOutList);

    $roles.delegate('img', 'click', employeeRecord.deleteName);

    $todos.delegate('.slideShow', 'click', employeeRecord.showRecord);

    $todos.delegate('.addButton', 'click', employeeRecord.addTodoContainer);

    $todos.delegate('.saveText', 'click', employeeRecord.saveTodo);

    $todos.delegate('.removeText', 'click', employeeRecord.removeTodo);
    
    $todos.delegate('.editButton', 'click', employeeRecord.editTodo);

    $employees.delegate('li', 'mouseenter', employeeRecord.addDeleteButton);
    
    $employees.delegate('li', 'mouseleave', employeeRecord.addDeleteButton);
    
    $employees.delegate('.delEmpButton', 'click', employeeRecord.deleteRecords);
    
    $('#submit').bind('click', function(event) {event.preventDefault(); employeeRecord.searchTodo();});

    $todos.delegate('.slideUp', 'click', employeeRecord.slideUpTodos);

    $todos.delegate('.slideDown', 'click', employeeRecord.slideDownTodos);
  }
}