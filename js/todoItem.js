var TodoItem = Backbone.Model.extend({

    urlRoot: "https://jsonplaceholder.typicode.com/todos",

    defaults: {
        completed: false
    },

    validate: function(attrs) {
        if (_.isEmpty(attrs.title)) {
            return "title is required";
        }
    },

    toggle: function() {
        this.set('completed', !this.get('completed'));
    }
});
