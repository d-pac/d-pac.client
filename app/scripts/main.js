'use strict';

var App = require( './app/App.js' );
var app = new App();

console.log( '--( MAIN )--' );
console.log( 'Backbone loaded', 'undefined' !== typeof Backbone );
console.log( 'Backbone.Marionette loaded', 'undefined' !== typeof Backbone.Marionette );
console.log( 'Jquery loaded', 'undefined' !== typeof $ );
console.log( 'Underscore/lodash loaded', 'undefined' !== typeof _ );
console.log( 'i18next loaded', 'undefined' !== typeof $.i18n );
console.log( 'Geppetto loaded', 'undefined' !== typeof Backbone.Geppetto );

