// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

// constructor function (Capitalize letter)
var Vehicle = Backbone.Model.extend({
    idAttribute: 'registrationNumber',

    urlRoot: '/api/vehicles',

    defaults: {
        registrationNumber: null
    },

    validate: function(attributes) {
        if (_.isUndefined(attributes.registrationNumber) || _.isNull(attributes.registrationNumber)) {
            return 'Vehicle should have registrationNumber';
        }
    },

    start: function() {
        console.log('Vehicle started')
    }
});

var Vehicles = Backbone.Collection.extend();

var VehicleView = Backbone.View.extend({
    tagName: 'li',

    className: 'vehicle',

    attributes: {
        "data-color": 'red'
    },

    render: function() {
        var source = $('#vehicleTemplate').html();
        var template = _.template(source);

        this.$el.html(template(this.model.toJSON()));
        this.$el.attr('id', 'vehicle_' + this.model.id);

        return this;
    }
});

var VehiclesView = Backbone.View.extend({
    tagName: 'ul',

    events: {
        "click .vehicle": "onDelete"
    },

    // initialize: function() {
    //     this.model.on('remove', this.onVehicleRemoved, this);
    // },

    onDelete: function(e) {
        e.stopPropagation();
        var id = e.target.id;
        this.model.remove(this.model.findWhere({id: id}));
        this.$el.find('#vehicle_' + id).remove();
    },

    render: function() {
        var self = this;
        this.model.each(function(vehicle) {
            var view = new VehicleView({model: vehicle});
            self.$el.append(view.render().$el);
        });

        return this;
    }
});

var vehicles = new Vehicles([
    new Vehicle({registrationNumber: 'XLI887', colour: 'Blue'}),
    new Vehicle({registrationNumber: 'ZNP123', colour: 'Blue'}),
    new Vehicle({registrationNumber: 'XUV456', colour: 'Gray'})
]);

var vehiclesView = new VehiclesView({model: vehicles});

$('#container').html(vehiclesView.render().$el);
