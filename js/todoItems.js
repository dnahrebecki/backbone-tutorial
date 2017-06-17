var TodoItems = Backbone.Collection.extend({

    url: "https://jsonplaceholder.typicode.com/todos",

    model: TodoItem
});
