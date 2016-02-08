'use strict';

awesome.constants.actions={
    //base reset
    RESET_STORES:'app.reset.all.stores',

    //global errors
    TRIGGER_GLOBAL_ERROR:'GlobalError.new',
    EXPIRE_GLOBAL_ERROR:'GlobalError.expire',

    //global modal
    TRIGGER_GLOBAL_MODAL:'GlobalModal.new',

    //user Input
    USER_INPUT_CHANGE:'userInput.changed',
    USER_INPUT_VALIDATE:'userInput.needs.validation',
    GENERIC_DRAG_DROP_FILE:'generic.drag.drop.file',

    //login
    LOGIN_ERROR:'login.error',
    LOGIN_REQUEST:'login.request',

    //router
    ROUTE_REQUEST_CHANGE:'router.request.navigation',
    ROUTE_REQUEST_SCREENS:'router.get.screens'
}
