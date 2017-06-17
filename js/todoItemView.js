var TodoItemView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click #toggle': 'onToggleClick'
    },

    initialize: function(options) {
        if (_.isEmpty(options) || _.isEmpty(options.model)) {
            throw new Error("model of TodoItem is not specified");
        }

        this.model.on('change', this.render, this);
    },

    // DOM events
    onToggleClick: function() {
        this.model.toggle();
    },

    render: function() {
        var checked = this.model.get('isCompleted') ? 'checked' : '';
        this.$el.toggleClass('completed', this.model.get('isCompleted'));
        this.$el.html("<input id='toggle' type='checkbox' " + checked + "/>" + this.model.escape("description"));

        return this;
    }
});
