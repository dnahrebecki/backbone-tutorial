
var TodoItemsView = Backbone.View.extend({

    tagName: 'ul',

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
    },

    onAddTodoItem: function(todoItem) {
        var todoItemView = new TodoItemView({model: todoItem});
        this.$el.append(todoItemView.render().$el);
    },

    onAddClicked: function() {
        var $todoItemInput = this.$('#newTodoItem');
        var description = $todoItemInput.val();

        if (_.isEmpty(description)) {
            return;
        }

        this.collection.add(new TodoItem({description: description}));
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
