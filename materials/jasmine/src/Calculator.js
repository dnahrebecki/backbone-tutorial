
var Calculator = function() {
    var add = function(a, b) {
        if (!a || !b) {
            throw new Error("Both arguments are needed");
        }
        return a + b;
    };

    return {
        add: add
    };
};
