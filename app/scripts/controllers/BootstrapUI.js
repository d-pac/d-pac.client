'use strict';
var debug = require( 'bows' )( 'dpac:controllers' );

var BootstrapUI = module.exports = function BootstrapUI(){
};

_.extend( BootstrapUI.prototype, {
    execute : function(){
        debug.log( 'BootstrapUI#execute' );
        this.context.wireView( 'MenuView', require( '../views/MenuView' ) );
        this.context.wireView( 'AccountView', require( '../views/AccountView' ) );
        this.context.wireView( 'LoginView', require( '../views/LoginView' ) );
        this.context.wireView( 'AppView', require( '../views/AppView' ) );
        this.context.wireView( 'WelcomeView', require( '../views/WelcomeView' ) );
        this.context.wireView( 'NotFoundView', require( '../views/404View' ) );
        this.context.wireView( 'LoadingView', require( '../views/LoadingView' ));
        this.context.wireView( 'AssessmentView', require( '../views/assessment/AssessmentView' ));
        this.context.wireView( 'AssessmentSelectionView', require( '../views/assessment/AssessmentSelectionView' ), {
            collection : "assessmentsCollection"
        } );
        this.context.wireView( 'ComparisonView', require('../views/assessment/ComparisonView'));

        var AppView = this.context.getObject( 'AppView' );
        var appView = new AppView();
        Backbone.Geppetto.bindContext( {
            view    : appView,
            context : this.context
        } );
        appView.render();
    }
} );

