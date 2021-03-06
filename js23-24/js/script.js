function Model(data) {
  var self = this;

  self.data = data;

  self.addItem = function (item) {
    if(item.length === 0){
      return;
    }

    self.data.push(item);
    return self.data;
  };
  self.remove = function (item) {
    var index  = self.data.indexOf(item);

    if (index=== -1) {
      return;
    }

    self.data.splice(index, 1);
    return self.data;
  };
}

function View(model) {
  var self = this;
  function init () {
    var wrapper = tmpl($('#wrapper-template').html());
    $('body').append(wrapper);
    self.elements = {
    input: $('.item-value'),
    addBtn: $('.item-add'),
    listContainer: $('.item-list')
    };
    self.renderList(model.data);
  };

  self.renderList = function (data) {
    var list = tmpl($('#list-template').html(), {data: data});
    self.elements.listContainer.html(list);
  };
init();
}

function Controller(model, view) {
  var self = this;
  view.elements.addBtn.on('click', addItem);
  view.elements.listContainer.on('click','.item-delete', removeItem);
  view.elements.listContainer.on('click','.item-edit', editItem);

  function addItem() {
    var newItem = view.elements.input.val();
    model.addItem(newItem);
    view.renderList(model.data);
    view.elements.input.val('');
  }

  function removeItem() {
    var item = $(this).attr('data-value');
    model.remove(item);
    view.renderList(model.data);
  }

  function editItem() {
    var item = $(this).attr('data-value');
    var idItem = document.getElementById(item);
    idItem.setAttribute('contenteditable', 'true');
    idItem.onblur = function () {
    idItem.setAttribute('contenteditable', 'false');
    model.data.splice(item, 1, document.getElementById("list-wrapper").getElementsByTagName("li")[item].textContent);
    }
  }
}

$(function () {
  var toDoList = ['Learn javascript', 'learn html', 'make coffee'];
  var model = new Model (toDoList);
  var view = new View(model);
  var controller = new Controller (model, view);
});
