var shared=require('../shared.js');


shared.dispatcher.on(
    shared.actions.TRIGGER_GLOBAL_ERROR,
    triggerGlobalError
);

shared.dispatcher.on(
    shared.actions.EXPIRE_GLOBAL_ERROR,
    expireGlobalError
);



function triggerGlobalError(message){
    shared.dispatcher.trigger(
        shared.storeEvents.GLOBAL_ERROR_NEW,
        message
    );
}

function expireGlobalError(message){
    shared.dispatcher.trigger(
        shared.storeEvents.GLOBAL_ERROR_EXPIRED,
        message
    );
}

/****************************************\
    shared.actions are not really modules
    we just export them as modules to be
    required in the shared.actions.js which is
    included in the app.js file to init
    all of the required shared.actions.

    all communication is done via a
    shared.dispatcher.
\****************************************/
module.exports=true;
