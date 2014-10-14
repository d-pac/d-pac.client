'use strict';

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
         * {String} HTML
         */
        comparativeFeedback : undefined,
        /**
         * {Representation.id}
         */
        selected            : undefined, //Representation.id
        /**
         * {Boolean}
         */
        completed           : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );

        //todo: don't know why but we have to do it like this, otherwise we get an error
        var model = this;
        this.listenTo( this, 'change:selected', function(){
            debug.debug( 'change:selected' );
            model.save();
        } );
        this.listenTo( this, 'change:phase', function(){
            debug.debug( 'change:phase' );
            model.save();
        } );
        this.listenTo( this, 'change:comparativeFeedback', function(){
            debug.debug( 'change:comparativeFeedback' );
            model.save();
        } );
        this.listenTo( this, 'change:completed', function(){
            debug.debug( 'change:completed' );
            model.save();
        } );
    },

    onTeardown : function(){
        debug( "#teardown" );
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
