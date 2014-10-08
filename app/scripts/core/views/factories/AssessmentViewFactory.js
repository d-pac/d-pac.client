'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapAssessments]' );

var AssessmentContext = require('../../../assess/AssessmentContext');

module.exports = Marionette.ItemView.extend( {
    constructor : function(){
        debug.log( '#constructor' );
        var context = this.context;
        var assessments = new AssessmentContext({
            parentContext : context
        });
        assessments.start();

        return assessments.getMainView();
    }
} );
