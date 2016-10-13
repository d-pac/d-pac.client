'use strict';
const {map} = require( 'lodash' );
const {ItemView} = require( 'backbone.marionette' );
const debug = require( 'debug' )( 'dpac:assess.views', '[ComparisonMessages]' );
const tpl = require( './templates/ComparisonMessages.hbs' );
const {t} = require( 'i18next' );

module.exports = ItemView.extend( {

    template: tpl,
    className: "col-md-12 column",

    initialize: function( opts ){
        debug( "#initialize" );
    },

    serializeData: function(){
        const data = {
            messages: this.model.get( 'messages' ),
            assessment: this.model.get( 'assessment' ).toJSON()
        };
        data.messages = map( data.messages, function( message ){
            return t( "assess:comparison_messages.messages." + message );
        } );
        return data;
    }
} );
