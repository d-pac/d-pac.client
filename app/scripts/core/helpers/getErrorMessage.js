'use strict';

module.exports = function getErrorMessage(err){

    if( err.explanation ){
        var explanation = err.explanation;
        if(!_.isArray( explanation )){
            explanation = [explanation];
        }
        var message = [];
        _.each(explanation, function(){
            var messageKey = S(explanation).slugify().s;
            message.push(i18n.t( ["errors:"+messageKey, explanation] ));
        });

    }else{
        var messageKey = S(err.message).slugify().s;
        message = [i18n.t( ["errors:"+messageKey, err.message] )];
    }
    //console.log(messageKey);
    return message.join("<br/>");
};
