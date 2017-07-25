define(['underscore', 'backbone', 'todoItem'], function(_, Backbone, TodoItem) {
    var TodoItems = Backbone.Collection.extend({

        url: "https://jsonplaceholder.typicode.com/todos",

        model: TodoItem
    });

    return TodoItems;
});
