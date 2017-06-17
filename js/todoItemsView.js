
var TodoItemsView = Backbone.View.extend({

    tagName: 'ul',

    id: 'todoItems',

    collection: TodoItems,

    events: {
        'click #add': 'onAddClicked',
        'keypress #newTodoItem': 'onKeyPress'
    },

    initialize: function(options) {
        if (_.isEmpty(options) || _.isEmpty(options.collection)) {
            throw new Error("collection of TodoItem is not specified");
        }

        this.collection.on('add', this.onAddTodoItem, this);
        this.collection.on('remove', this.onRemoveTodoItem, this);
    },

    onAddTodoItem: function(todoItem) {
        var todoItemView = new TodoItemView({model: todoItem});
        this.$el.append(todoItemView.render().$el);
    },

    onRemoveTodoItem: function(todoItem) {
        // do we need this? model is removed from collection, and view itself called .remove()
    },

    onAddClicked: function() {
        var $todoItemInput = this.$('#newTodoItem');
        var title = $todoItemInput.val();

        if (_.isEmpty(title)) {
            return;
        }

        this.collection.create(new TodoItem({title: title}));
        $todoItemInput.val('');
    },

    onKeyPress: function(e) {
        if (e.keyCode === 13) {
            this.onAddClicked();
        }
    },

    render: function() {
        this.$el.append('<input type="text" id="newTodoItem" autofocus />');
        this.$el.append('<button id="add">Add</button>');

        this.collection.each(function(todoItem) {
            var todoItemView = new TodoItemView({model: todoItem});
            this.$el.append(todoItemView.render().$el);
        }, this);

        return this;
    }
});
