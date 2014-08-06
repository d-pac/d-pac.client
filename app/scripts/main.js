'use strict';

console.log('--( MAIN )--');
console.log('Backbone loaded', 'undefined' !== typeof Backbone );
console.log('Backbone.Marionette loaded', 'undefined' !== typeof Backbone.Marionette );
console.log('Jquery loaded', 'undefined' !== typeof $ );
console.log('Underscore/lodash loaded', 'undefined' !== typeof _);
var temp = require('./temp.js');
console.log(temp.temp);

