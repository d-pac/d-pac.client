'use strict';

module.exports = {
    url: function(){
        return this.api.launchUrl;
    },
    sections: {
        menu: {
            selector: '.navbar-header',
            elements: {
                "brand": "#brand-href img"
            }
        },
        content: {
            selector: "#core-welcome-view",
            elements: {
                "loginBtn": "#core-welcome-view .login-btn",
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
                    .waitForElementNotPresent( '@loginBtn', 1000 );
            },
            clickPasswordForgotten: function(){
                return this.section.content.click( '@passwordForgottenBtn' )
                    .waitForElementNotPresent( '@passwordForgottenBtn', 1000 )
            }
        }
    ]
};
