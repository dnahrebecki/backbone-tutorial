
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

var Car = Vehicle.extend({
    start: function() {
        console.log('Car with registration number `' + this.get('registrationNumber') + '` started.')
    }
});

var car = new Car({
    registrationNumber: 'XLI887',
    color: 'Blue'
});

car.unset('registrationNumber');

if (!car.isValid()) {
    console.log(car.validationError);
}

car.set('registrationNumber', 'XLI887');

console.log(car.isValid());

car.start();
