'use strict';
var _ = require( 'underscore' );

var debug = require( 'debug' )( 'dpac:core.views', '[TutorialView]' );
var tpl = require( './templates/Tutorial.hbs' );
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend( {
    template   : tpl,

    initialize: function(){
        debug("#initialize");
    }
} );

