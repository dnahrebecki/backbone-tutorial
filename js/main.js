
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

var Car = Vehicle.extend({
    start: function() {
        console.log('Car with registration number `' + this.get('registrationNumber') + '` started.')
    }
});

var vehicles = new Vehicles([
    new Car({registrationNumber: 'XLI887', colour: 'Blue'}),
    new Car({registrationNumber: 'ZNP123', colour: 'Blue'}),
    new Car({registrationNumber: 'XUV456', colour: 'Gray'})
]);

var blueCars = vehicles.where({colour: 'Blue'});

console.log('Blue cars', blueCars);

var carToRemove = vehicles.findWhere({registrationNumber: 'XLI887'});
console.log('XLI887: ', carToRemove);

vehicles.remove(carToRemove);
console.log(vehicles.length);

console.log('json: ', vehicles.toJSON());

vehicles.each(function(vehicle) {
    console.log(vehicle);
});
