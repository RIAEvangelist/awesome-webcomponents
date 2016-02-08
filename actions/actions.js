'use strict';

require('./appReset/AppReset.js');
require('./errors/Errors.js');
require('./userInput/UserInput.js');
require('./routing/Navigation.js');
require('./fileReader/FileReader.js');
require('./modals/Modals.js');


/****************************************\
    actions are not really modules
    we just export them as modules to be
    required in the app.js file to init
    all of the required actions.

    all communication is done via a
    dispatcher.
\****************************************/
module.exports.ready=true;
