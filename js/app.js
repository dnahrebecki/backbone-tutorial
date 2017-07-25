define(['underscore', 'backbone', 'todoItems', 'todoItemsView'], function(_, Backbone, TodoItems, TodoItemsView) {

    var initialize = function() {
        var todoItems = new TodoItems();
        todoItems.fetch();

        var todoItemsView = new TodoItemsView({collection: todoItems});

        $('#container').html(todoItemsView.render().$el);
    };

    return {
        initialize: initialize
    };
});


