'use strict';

module.exports = {
    url: function(){
        return this.api.launchUrl + '/#signin';
    },
    sections: {
        menu: require( './menu' ),
        content: {
            selector: "#core-signin-view",
            elements: {
                "signinBtn": ".login-btn",
                "passwordForgottenBtn": ".password-forgotten-btn",
                "emailInput": "input#email",
                "passwordInput": "input#password",
                "tutorialBtn": "a[href='#tutorial']",
                "uploadsBtn": "a[href='#uploads']",
                "assessBtn": "a[href='#assess']",
                "resultsBtn": "a[href='#results']"
            }
        }
    },
    commands: [
        {
            signinUser: function( user ){
                return this.section.content
                    .setValue( '@emailInput', user.email )
                    .setValue( '@passwordInput', user.password )
                    .click( '@signinBtn' )
                    .waitForElementNotPresent( '@signinBtn', 5000 )
                    ;

            }
        }
    ]
};
