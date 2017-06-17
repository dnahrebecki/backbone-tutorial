var TodoItem = Backbone.Model.extend({
    validate: function(attrs) {
        if (_.isEmpty(attrs.description)) {
            return "Description is required";
        }
    }
});
