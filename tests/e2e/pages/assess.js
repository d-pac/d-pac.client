'use strict';

module.exports = {
    url: function(){
        return this.api.launchUrl + '/#assess';
    },
    sections: {
        menu: require( './menu' ),
        assessmentSelection: {
            selector: "#assess-selection-view",
            elements: {
                "assessmentBtn": ".assessment-button"
            }
        },
        assessmentDetails: {
            selector: "#assessment-details",
            elements: {
                "assessorAssignmentBtn": "[data-target='#assessor_assignment']",
                "assesseeAssignmentBtn": "[data-target='#assessee_assignment']",
            }
        },
        assessmentRepresentations: {
            selector: "#assessment-representations",
            elements: {
                representationA: "#representation-A .representation",
                representationB: "#representation-B .representation",
                notesA: "#note-A .notes-label",
                notesB: "#note-B .notes-label"
            }
        },
        assessmentPhases: {
            selector: "#assessment-phases",
            elements: {
                selectAbtn: "#select-A-button",
                selectBbtn: "#select-B-button",
            }
        }
    },
    commands: [{
        clickAssessment: function(){
            return this.section.assessmentSelection.click( '@assessmentBtn' )
                .waitForElementNotPresent( '@assessmentBtn', 5000 );
        }
    }]
};
