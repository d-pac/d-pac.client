'use strict';

console.log('--( MAIN )--');
console.log('Backbone loaded', 'undefined' !== typeof Backbone );
console.log('Backbone.Marionette loaded', 'undefined' !== typeof Backbone.Marionette );
console.log('Jquery loaded', 'undefined' !== typeof $ );
var temp = require('./temp.js');
console.log(temp.temp);
