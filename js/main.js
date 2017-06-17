// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

$(document).ready(function() {
    var todoItems = new TodoItems();
    todoItems.fetch();

    var todoItemsView = new TodoItemsView({collection: todoItems});

    $('#container').html(todoItemsView.render().$el);
});
