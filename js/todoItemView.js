
var TodoItemView = Backbone.View.extend({

    tagName: 'li',

    initialize: function(options) {
        if (_.isEmpty(options) || _.isEmpty(options.model)) {
            throw new Error("model of TodoItem is not specified");
        }
    },

    render: function() {
        this.$el.html(this.model.get("description"));

        return this;
    }
});
