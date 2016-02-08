var shared=require('../shared.js');


shared.dispatcher.on(
    shared.actions.TRIGGER_GLOBAL_MODAL,
    receivedModalState
);

function receivedModalState(message){
    shared.dispatcher.trigger(
        shared.storeEvents.GLOBAL_MODAL_NEW,
        message
    );
}




/****************************************\
    actions are not really modules
    we just export them as modules to be
    required in the actions.js which is
    included in the app.js file to init
    all of the required actions.

    all communication is done via a
    dispatcher.
\****************************************/
module.exports=true;
