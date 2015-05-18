'use strict';
var _ = require( 'underscore' );
var Marionette = require( 'backbone.marionette' );
var debug = require( 'debug' )( 'dpac:core.controllers', '[AssessmentMediator]' );

var AssessmentContext = require( '../../assess/AssessmentContext' );
module.exports = Marionette.Controller.extend( {
    context: undefined,
    model: undefined,
    subject : undefined,

    initialize : function(){
        debug.log("#initialize");
        this.context.wireValue('assessmentViewProxy', this.getMainView.bind(this));
        this.model.on("change:authenticated", this.handleAuthenticationChange, this);
        this.handleAuthenticationChange();
    },

    handleAuthenticationChange: function(){
        if(this.model.get('authenticated')){
            this.subject = new AssessmentContext( {
                parentContext: this.context
            } );
            this.subject.start( this.model.get( 'user' ) );
        }else{
            //todo: break down?
        }
    },

    getMainView : function(){
        return this.subject.getMainView();
    }
});
