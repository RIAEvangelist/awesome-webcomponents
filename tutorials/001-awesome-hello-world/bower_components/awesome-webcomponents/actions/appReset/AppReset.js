var shared=require('../shared.js');

shared.dispatcher.on(
    shared.actions.RESET_STORES,
    resetStores
);

function resetStores(){
    shared.dispatcher.trigger(shared.storeEvents.RESET);
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
