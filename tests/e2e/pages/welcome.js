'use strict';

module.exports = {
    url: function(){
        return this.api.launchUrl;
    },
    sections: {
        menu: require( './menu' ),
        content: {
            selector: "#core-welcome-view",
            elements: {
                "loginBtn": ".login-btn",
                "passwordForgottenBtn": ".password-forgotten-btn",
                "titleText": ".well h4",
                "bodyText": ".page-body"
            }
        }
    },
    commands: [
        {
            clickLogin: function(){
                return this.section.content.click( '@loginBtn' )
                    .waitForElementNotPresent( '@loginBtn', 5000 );
            },
            clickPasswordForgotten: function(){
                return this.section.content.click( '@passwordForgottenBtn' )
                    .waitForElementNotPresent( '@passwordForgottenBtn', 5000 )
            }
        }
    ]
};
