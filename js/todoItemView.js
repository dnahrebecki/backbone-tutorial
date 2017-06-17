var TodoItemView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click #toggle': 'onClickToggle',
        'click #delete': 'onClickDelete'
    },

    initialize: function(options) {
        if (_.isEmpty(options) || _.isEmpty(options.model)) {
            throw new Error("model of TodoItem is not specified");
        }

        this.model.on('change', this.render, this);
    },

    // DOM events
    onClickToggle: function() {
        this.model.toggle();
        this.model.save();
    },
    
    onClickDelete: function() {
        this.model.destroy();
        this.remove();
    },

    render: function() {
        this.$el.attr("id", this.model.id);
        this.$el.toggleClass('completed', this.model.get('completed'));
        var checked = this.model.get('completed') ? 'checked' : '';
        var checkbox = "<input id='toggle' type='checkbox' " + checked + "/>";
        var deleteButton = "<button id='delete'>Delete</button>";

        this.$el.html(checkbox + this.model.escape("title") + deleteButton);

        return this;
    }
});
