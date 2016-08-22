'use strict';

module.exports = {
    before: function( client ){
        client.resizeWindow( 1024, 768 );
    },
    after: function( client ){
        client.end();
    },

    'redirects to signin': function( client ){
        client
            .signout()
            .assert.urlEquals( client.page.signin().url );
    }
};
