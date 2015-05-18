'use strict';
var _ = require( 'underscore' );
var Backbone = require('backbone');
var Select = require('backbone.select');

var debug = require( 'debug' )( 'dpac:assess.models', '[ComparisonProxy]' );

var teardown = require( '../mixins/teardown' );

module.exports = Backbone.Model.extend( {

    urlRoot     : '/comparisons',
    idAttribute : "_id",
    defaults    : {
        /**
         * {Assessment.id}
         */
        assessment          : undefined,
        /**
         * {User.id}
         */
        assessor            : undefined,
        /**
         * {Phase.id}
         */
        phase               : undefined,

        /**
         * {Boolean}
         */
        completed           : undefined,

        representations : {
            a: undefined,
            b: undefined
        },
        data : undefined,
        progress: {
            total: undefined,
            completed: undefined
        }
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );

        //todo: don't know why but we have to do it like this, otherwise we get an error
        var model = this;
        Select.Me.applyTo( this );
        this.on("change:selected change:phase change:data change:completed", function(){
            model.save();
        });
    },

    onTeardown : function(){
        debug( "#teardown" );
        this.off("change");
    },

    save : _.debounce( function( attrs ){
        debug( '#save' );
        if( attrs ){
            this.set( attrs );
        }
        Backbone.Model.prototype.save.call( this );
    }, 1000 )

} );
teardown.model.mixin( module.exports );
