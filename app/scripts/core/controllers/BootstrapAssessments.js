'use strict';
var debug = require( 'debug' )( 'dpac:core.controllers', '[BootstrapAssessments]' );

var AssessmentContext = require('../../assess/AssessmentContext');

var BootstrapAssessments = module.exports = function BootstrapAssessments(){
};
_.extend( BootstrapAssessments.prototype, {
    execute : function(){
        debug.log( '#execute' );
        var context = this.context;
        var assessments = new AssessmentContext({
            parentContext : context
        });
        assessments.start();

        context.wireValue('assessmentView', assessments.getMainView());
    }
} );
