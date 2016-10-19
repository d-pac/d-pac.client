'use strict';
const {ItemView} = require( 'backbone.marionette' );

const debug = require( 'debug' )( 'dpac:results.views', '[AssessmentMenu]' );
const tpl = require( './templates/AssessmentMenu.hbs' );

module.exports = ItemView.extend( {
    template: tpl,
    initialize: function(){
        debug( '#initialize' );
    },

    serializeData: function(){
        return this.collection.selected.toJSON();
    }
} );
