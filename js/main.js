require.config({
    paths: {
        jquery: 'lib/jquery-min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        mustache: 'lib/mustache'
    }
});

define(['app'], function(App) {
    App.initialize();
});
