'use strict';
var _ = require( 'underscore' );

var S = require( 'string' );
var i18n = require( "i18next" );
var debug = require( 'debug' )( 'dpac:core', '[ErrorModel]' );

module.exports = Backbone.Model.extend( {
    defaults: {
        err: undefined,
        title: undefined,
        message: undefined,
        code: undefined,
        requestUUID: undefined,
        url: undefined,
        fatal: false,
        dumped: false
    },

    initialize: function( attrs ){
        debug( '#initialize', this.id || '<new>' );
        this._parseError();
    },

    _getLocalized: function( message ){
        var messageKey = S( message ).slugify().s;
        return i18n.t( [ "errors:" + messageKey, message ] );
    },

    _parseError: function(){
        var err = this.get( 'err' );
        if( err ){
            var message = [];
            if( err.explanation ){
                var explanation = err.explanation;
                if( !_.isArray( explanation ) ){
                    explanation = [ explanation ];
                }
                _.each( explanation, function( line ){
                    message.push( this._getLocalized( line ) );
                }, this );

            } else {
                message = [ this._getLocalized( "Please contact" ) ];
            }
            this.set( {
                message: message.join( "<br/>" ),
                code: err.code,
                title: this._getLocalized( err.message )
            } );
        }
    }
} );
