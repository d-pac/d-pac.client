'use strict';

var _ = require('lodash');
var debug = require( 'debug' )( 'dpac:core.controllers', '[SetupAssessmentI18NSyncing]' );
var i18n = require( 'i18next' );

module.exports = function SetupAssessmentI18NSyncing(){
    //constructor
};

_.extend( module.exports.prototype, {
    wiring: ['assessmentsCollection'],
    execute: function(){
        debug( '#execute' );
        var defaultAssessmentCopy = i18n.getResourceBundle( i18n.lng(), 'assess' );
        this.assessmentsCollection.on('change:selected', function(assessment){
            if(assessment){
                var mergedAssessmentCopy = _.defaultsDeep( {}, assessment.get( 'uiCopy' ), defaultAssessmentCopy );
                i18n.addResourceBundle( i18n.lng(), 'assess', mergedAssessmentCopy );
            }
        }, this);
    }
});
