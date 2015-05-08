'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[AssessmentMediator]' );

var AssessmentContext = require( '../../assess/AssessmentContext' );
module.exports = Marionette.Controller.extend( {
    initialize : function(){
        debug.log("#initialize");
        this.model.on("change:authenticated", this.handleAuthenticationChange, this);
        this.handleAuthenticationChange();
    },

    handleAuthenticationChange: function(){
        if(this.model.get('authenticated')){
            var assessments = new AssessmentContext( {
                parentContext: this.context
            } );
            assessments.start( this.model.get( 'user' ) );
        }else{
            //todo:
        }
    }
});
