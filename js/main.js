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

    events: {
        "click .delete": "onDelete",
    },

    initialize: function(options) {
        this.bus = options.bus;
    },

    render: function() {
        var source = $('#vehicleTemplate').html();
        var template = _.template(source);

        this.$el.html(template(this.model.toJSON()));
        this.$el.attr('id', 'vehicle_' + this.model.id);
        this.$el.attr('data-color', this.model.get('colour'));

        return this;
    },

    onDelete: function(){
        this.bus.trigger('vehicle:removed', this.model);
        this.remove();
    }
});

var VehiclesView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function(options) {
        this.bus = options.bus;

        bus.on('vehicle:added', this.onVehicleAdded, this);
        bus.on('vehicle:removed', this.onVehicleRemoved, this);
    },

    onVehicleAdded: function(model) {
        this.collection.add(model);
        this.render();
    },

    onVehicleRemoved: function(model) {
        this.collection.remove(model);
        this.render();
    },

    render: function() {
        var self = this;
        this.$el.html('');

        this.collection.each(function(vehicle) {
            var view = new VehicleView({model: vehicle, bus: bus});
            self.$el.prepend(view.render().$el);
        });

        return this;
    }
});

var NewVehicleView = Backbone.View.extend({

    el: '#addVehicle',

    events: {
        'click .addVehicleButton': 'onClickAdd'
    },

    initialize: function(options) {
        this.bus = options.bus;
    },

    onClickAdd: function(e) {
        var input = $('input[name="addVehicle"]');
        var registrationNumber = input.val();

        if (_.isEmpty(registrationNumber)) {
            return;
        }

        this.bus.trigger('vehicle:added', new Vehicle({registrationNumber: registrationNumber}));
        input.val('');
    },

    render: function() {
        this.$el.html('<input name="addVehicle" type="text" /><button class="addVehicleButton">Add</button>');
    }
});

var bus = _.extend({}, Backbone.Events);

var vehicles = new Vehicles([
    new Vehicle({registrationNumber: 'XLI887', colour: 'Blue'}),
    new Vehicle({registrationNumber: 'ZNP123', colour: 'Blue'}),
    new Vehicle({registrationNumber: 'XUV456', colour: 'Gray'})
]);

var vehiclesView = new VehiclesView({collection: vehicles, bus: bus});
$('#container').html(vehiclesView.render().$el);

var newVehicleView = new NewVehicleView({bus: bus});
newVehicleView.render();
