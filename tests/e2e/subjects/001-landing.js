'use strict';

module.exports = {
    before: function( client ){
        client.resizeWindow( 1024, 768 );
        client.signout();
    },
    beforeEach: function( client ){
        const page = client.page.welcome();
        page
            .navigate()
            .waitForElementVisible( page.section.content.selector, client.globals.timeout );
    },

    after: function( client ){
        client.end();
    },

    'UI is constructed': function( client ){
        client.takeSnapshot( module );

        const page = client.page.welcome();
        page.section.menu
            .assert.visible( '@brand' )
            .assert.visible( '@tutorialBtn' )
            .assert.visible( '@loginBtn' )
            .assert.visible( '@feedbackBtn' )
            .assert.elementNotPresent( '@assessBtn' )
            .assert.elementNotPresent( '@resultsBtn' )
            .assert.elementNotPresent( '@accountBtn' )
            .assert.elementNotPresent( '@signoutBtn' )
        ;

        page.section.content
            .assert.visible( '@titleText' )
            .assert.containsText( '@titleText', 'WELKOM' )
            .assert.visible( '@bodyText' )
            .assert.containsText( '@bodyText', 'Beste beoordelaar' )
            .assert.visible( '@loginBtn' )
            .assert.visible( '@passwordForgottenBtn' )
        ;
    },

    'login button redirects to login page': function( client ){
        client
            .page.welcome()
            .clickLogin()
            .assert.urlEquals( client.page.signin().url );
    },

    'password forgotten button redirects to password forgotten page': function( client ){
        client
            .page.welcome()
            .clickPasswordForgotten()
            .assert.urlEquals( 'http://localhost:3029/auth/resetpassword' );
    }
};
