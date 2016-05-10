'use strict';

const config = require( '../config' );

module.exports = {
    before: function( client ){
        client.signout();
    },
    beforeEach: function( client ){
        const  page = client.page.signin();
        page
            .navigate()
            .waitForElementVisible( page.section.content.selector, client.globals.timeout );
    },

    after: function( client ){
        client.end();
    },

    'UI is constructed': function( client ){
        client.takeSnapshot( module, 'before' );

        const page = client.page.signin();
        const content = page.section.content;
        content
            .assert.visible( '@emailInput' )
            .assert.visible( '@passwordInput' )
        ;
        page.signinUser( config.defaultUser );
        content
            .assert.visible( '@tutorialBtn' )
            .assert.visible( '@uploadsBtn' )
            .assert.visible( '@assessBtn' )
            .assert.visible( '@resultsBtn' )
        ;
        client.takeSnapshot( module, 'after' );
    }
};
