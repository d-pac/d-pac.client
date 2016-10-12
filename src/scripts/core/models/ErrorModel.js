'use strict';
const {kebabCase, isArray, each} = require( 'lodash' );
const {Model} = require('backbone');

const {t} = require( "i18next" );
const debug = require( 'debug' )( 'dpac:core', '[ErrorModel]' );

module.exports = Model.extend( {
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
        const messageKey = kebabCase(message);
        return t( [ "errors:" + messageKey, message ] );
    },

    _parseError: function(){
        const err = this.get( 'err' );
        if( err ){
            let message = [];
            if( err.explanation ){
                let explanation = err.explanation;
                if( !isArray( explanation ) ){
                    explanation = [ explanation ];
                }
                each( explanation, function( line ){
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
