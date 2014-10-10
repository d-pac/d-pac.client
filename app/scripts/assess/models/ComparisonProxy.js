'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[ComparisonProxy]' );

var teardown = require('../mixins/teardown');

module.exports = Backbone.Model.extend( {
    timeoutId   : undefined,
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
        debug( '#initialize', this.id );
        teardown.model.mixin(this);

        //todo: don't know why but we have to do it like this, otherwise we get an error
        var model = this;
        var saveModel = function(){
            model.save();
        };
        this.listenTo( this, 'change:selected change:phase change:comparativeFeedback change:completed', saveModel );
    },

    save : _.debounce( function( attrs ){
        debug( '#save' );
        if( attrs ){
            this.set( attrs );
        }
        Backbone.Model.prototype.save.call( this );
    }, 1000 )

} );
