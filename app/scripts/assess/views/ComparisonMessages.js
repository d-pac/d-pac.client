'use strict';
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:assess.views', '[ComparisonMessages]' );
var tpl = require( './templates/ComparisonMessages.hbs' );
var i18n = require( 'i18next' );

module.exports = Marionette.ItemView.extend( {

    template: tpl,
    className: "col-md-12 column",

    initialize: function( opts ){
        debug( "#initialize" );
    },

    serializeData: function(){
        var data = {
            messages: this.model.get( 'messages' ),
            assessment: this.model.get('assessment' ).toJSON()
        };
        data.messages = _.map( data.messages, function( message ){
            return i18n.t( "assessment:comparison_messages.messages." + message );
        } );
        return data;
    }
} );
