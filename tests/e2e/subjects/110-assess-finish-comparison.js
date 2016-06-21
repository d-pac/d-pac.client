'use strict';

module.exports = {
    before: function( client ){
        client
            .signout()
            .signin()
        ;
        const page = client.page.assess();
        page
            .navigate()
            .waitForElementVisible( page.section[ 'comparisonUnfinished' ].selector, client.globals.timeout )
        ;
    },

    after: function( client ){
        client.end();
    },

    "comparison flow (2): finish comparison": function( client ){

        const page = client.page.assess();

        page.clickFinishComparison();
    },

};
