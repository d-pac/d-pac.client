'use strict';

const debug = require( 'debug' )( 'dpac:core.views', '[TutorialView]' );
const tpl = require( './templates/Tutorial.hbs' );
const {ItemView} = require('backbone.marionette');

module.exports = ItemView.extend( {
    template   : tpl,

    initialize: function(){
        debug("#initialize");
    }
} );

