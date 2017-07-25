define(
    ['underscore', 'backbone', 'jquery', 'mustache', 'todoItem', 'todoItems', 'todoItemView'],
    function(_, Backbone, $, Mustache, TodoItem, TodoItems, TodoItemView) {
        var TodoItemsView = Backbone.View.extend({

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
                this.$('#todoItems').append(todoItemView.render().$el);
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
                var template = $('#todoItemsTemplate').html();
                var html = Mustache.render(template);

                this.$el.html(html);

                return this;
            }
        });

        return TodoItemsView;
    }
);
