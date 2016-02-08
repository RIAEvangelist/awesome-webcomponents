var shared=require('../shared.js');

shared.dispatcher.on(
    shared.actions.REPLAY_START_RECORDING,
    startRecording
)



function startRecording(){
    shared.dispatcher.trigger(shared.storeEvents.REPLAY_START_RECORDING);
}

function startRecording(){
    shared.dispatcher.trigger(shared.storeEvents.REPLAY_STOP_RECORDING);
}

function startRecording(){
    shared.dispatcher.trigger(shared.storeEvents.REPLAY_PLAYBACK_START);
}

function startRecording(){
    shared.dispatcher.trigger(shared.storeEvents.REPLAY_CLEAR_LOG);
}

function startRecording(){
    shared.dispatcher.trigger(shared.storeEvents.REPLAY_EXPORT_LOG);
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
