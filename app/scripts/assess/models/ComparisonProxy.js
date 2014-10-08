'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[ComparisonProxy]' );
module.exports = Backbone.Model.extend( {
    timeoutId   : undefined,
    urlRoot     : '/comparisons',
    idAttribute : "_id",
    defaults    : {
        assessment          : undefined,
        assessor            : undefined,
        phase               : undefined,
        comparativeFeedback : undefined,
        selected            : undefined //Representation.id
    },

    initialize : function(){
        debug( '#initialize', this.id );

        //todo: don't know why but we have to do it like this, otherwise we get an error
        var model = this;
        var saveModel = function(){
            model.save();
        };
        this.on( 'change:selected', saveModel );
        this.on( 'change:phase', saveModel );
        this.on( 'change:comparativeFeedback', saveModel );
    },

    save : _.debounce( function( attrs ){
        debug( '#save' );
        if( attrs ){
            this.set( attrs );
        }
        Backbone.Model.prototype.save.call( this );
    }, 1000 )

    //save : function(attrs){
    //    debug('#save', attrs);
    //    this.set(attrs);
    //    if(this.timeoutId){
    //        clearTimeout(this.timeoutId);
    //    }
    //    this.timeoutId = setTimeout(function(){
    //        Backbone.Model.prototype.save.call(this);
    //    }.bind(this), 1000);
    //}

} );
