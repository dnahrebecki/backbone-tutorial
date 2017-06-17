var TodoItem = Backbone.Model.extend({

    url: "fakeUrl",

    defaults: {
        isCompleted: false
    },

    validate: function(attrs) {
        if (_.isEmpty(attrs.description)) {
            return "Description is required";
        }
    },

    toggle: function() {
        this.set('isCompleted', !this.get('isCompleted'));
    }
});
