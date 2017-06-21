var TodoItemView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click #toggle': 'onClickToggle',
        'click #title': 'onClickTitle',
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

    onClickTitle: function() {
        this.onClickToggle();
    },
    
    onClickDelete: function() {
        this.model.destroy();
        this.remove();
    },

    render: function() {
        this.$el.attr("id", this.model.id);
        this.$el.toggleClass('completed', this.model.get('completed'));

        var template = $('#todoItemTemplate').html();
        var html = Mustache.render(template, this.model.toJSON());
        this.$el.html(html);

        return this;
    }
});
