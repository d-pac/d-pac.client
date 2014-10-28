'use strict';

var debug = require( 'debug' )( 'dpac:assess.models', '[PhaseProxy]' );
var teardown = require('../mixins/teardown');
module.exports = Backbone.Model.extend( {
    idAttribute : "_id",
    defaults    : {
        type : undefined,
        label : undefined
    },

    initialize : function(){
        debug( '#initialize', this.id || '<new>' );
        Backbone.Select.Me.applyTo( this );
    },
    get : function( attr ){
        if( typeof this["_get_" + attr] == 'function' ){
            return this["_get_" + attr]();
        }

        return Backbone.Model.prototype.get.call( this, attr );
    },

    _get_slug : function(){
        return S( this.get( 'label' ) ).slugify().s;
    },

    onTeardown : function(){
        debug( "#teardown" );
        this.deselect( { silent : true } );
    }
} );
teardown.model.mixin( module.exports );

