'use strict';

const P = require( 'bluebird' );

module.exports = {
    before: function(client){
        const page = client.page.welcome();

        page.navigate();
        client.waitForElementVisible( 'body', 1000 );
    },

    after: function(client){
        client.end();
    },

    'landing': function( client ){
        const expect = client.expect;

        const page = client.page.welcome();
        page.expect.section( '@menu' ).to.be.visible;
        const menu = page.section.menu;
        menu.expect.element( '@brand' ).to.be.visible;

        page.expect.section( '@content' ).to.be.visible;
        const content = page.section.content;

        content.expect.element( '@titleText' ).to.be.visible;
        content.expect.element( '@titleText' ).text.to.contain( 'WELKOM' );

        content.expect.element( '@bodyText' ).to.be.visible;
        content.expect.element( '@bodyText' ).text.to.contain( 'Beste beoordelaar' );

        content.expect.element( '@loginBtn' ).to.be.visible;
        content.expect.element( '@passwordForgottenBtn' ).to.be.visible;

        page.clickLogin();

        const signin = client.page.signin();
        client.assert.urlEquals( signin.url );

    }
};
