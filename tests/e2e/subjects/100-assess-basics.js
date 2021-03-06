'use strict';

module.exports = {
    before: function( client ){
        client.resizeWindow( 1024, 768 );
        client
            .signout()
            .signin()
        ;
        const page = client.page.assess();
        page
            .navigate()
            .waitForElementVisible( page.section[ 'assessmentSelection' ].selector, client.globals.timeout )
        ;
    },

    after: function( client ){
        client.end();
    },

    "comparison flow (0): select an assessment": function( client ){
        client.takeSnapshot( module, 'before selection' );
        const page = client.page.assess();

        page.section.assessmentSelection
            .assert.visible( '@assessmentBtn' )
        ;
        page.clickAssessment();

    },

    "comparison flow (1): assessment details": function( client ){

        const page = client.page.assess();

        page.section.assessmentDetails
            .assert.visible( '@assessorAssignmentBtn' )
            .assert.visible( '@assesseeAssignmentBtn' )
        ;
    },

    "comparison flow (1): representations": function( client ){
        const page = client.page.assess();

        page.section.assessmentRepresentations
            .assert.visible( '@representationA' )
            .assert.visible( '@representationB' )
            .assert.visible( '@notesA' )
            .assert.visible( '@notesB' )
        ;
    },

    "comparison flow (1): phase 'select best'": function( client ){
        client.takeSnapshot( module, 'select best' );
        const page = client.page.assess();

        page.section.assessmentPhases
            .assert.visible( '@selectAbtn' )
            .assert.visible( '@selectBbtn' )
        ;
        page.selectA();
    }

};
