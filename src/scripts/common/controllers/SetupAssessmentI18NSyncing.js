'use strict';

const {extend, defaultsDeep} = require('lodash');
const debug = require( 'debug' )( 'dpac:core.controllers', '[SetupAssessmentI18NSyncing]' );
const i18n = require( 'i18next' );

module.exports = function SetupAssessmentI18NSyncing(){
    //constructor
};

extend( module.exports.prototype, {
    wiring: ['assessmentsCollection'],
    execute: function(){
        debug( '#execute' );
        const defaultAssessmentCopy = i18n.getResourceBundle( i18n.lng(), 'assess' );
        this.assessmentsCollection.on('change:selected', function(assessment){
            if(assessment){
                const mergedAssessmentCopy = defaultsDeep( {}, assessment.get( 'uiCopy' ), defaultAssessmentCopy );
                i18n.addResourceBundle( i18n.lng(), 'assess', mergedAssessmentCopy );
            }
        }, this);
    }
});
