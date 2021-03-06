'use strict';
const {reduce} = require( 'lodash' );
const NestedModel = require( 'backbone-nested-model' );
const debug = require( 'debug' )( 'dpac:core.models', '[AccountProxy]' );
module.exports = NestedModel.extend( {
    idAttribute: "_id",
    url: '/user',
    defaults: {
        name: {
            first: undefined,
            last: undefined
        },
        email: undefined,
        password: undefined,
        password_confirm: undefined
    },

    initialize: function(){
        debug( '#initialize', this.id );
    },

    patch: function( attrs ){
        this.save( attrs, { patch: true } );
    },

    getAssessments: function( role ){
        if( role ){
            role = role.toLowerCase();
            return this.get( 'assessments.' + role ) || [];
        }
        return reduce( this.get( 'assessments' ), ( memo,
                                                      forRole )=>{
            return memo.concat( forRole );
        }, [] );
    }
} );
