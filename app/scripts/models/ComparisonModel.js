'use strict';
var debug = require( 'debug' )( 'dpac:models', '[ComparisonModel]' );

module.exports = Backbone.NestedModel.extend( {

    initialize : function(){
        debug( '#initialize' );
    },

    toJSON : function(){
        //Holy crap, do we really need to do this?
        var attr = Backbone.Model.prototype.toJSON.call( this );
        attr.title = this.get( 'assessment.title' );
        attr.description = this.get( 'assessment.description' );
        return attr;
    },

    isActive : function(){
        return this.get( 'comparison.active' );
    }

} );
