var shared = require('../shared.js');


shared.dispatcher.on(
    shared.actions.USER_INPUT_CHANGE,
    inputChanged
);

shared.dispatcher.on(
    shared.actions.USER_INPUT_VALIDATE,
    validateInput
);

function inputChanged(message) {
    shared.dispatcher.trigger(
        shared.storeEvents.UPDATED_USER_INPUT,
        message
    );
}

function validateInput() {
    console.warn('Woah now!');
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
module.exports = true;
