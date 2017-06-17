
var TodoItemsView = Backbone.View.extend({

    tagName: 'ul',

    collection: TodoItems,

    initialize: function(options) {
        if (_.isEmpty(options) || _.isEmpty(options.collection)) {
            throw new Error("collection of TodoItem is not specified");
        }
    },
    
    render: function() {
        this.collection.each(function(todoItem) {
            var todoItemView = new TodoItemView({model: todoItem});
            this.$el.append(todoItemView.render().$el);
        }, this);

        return this;
    }
});
