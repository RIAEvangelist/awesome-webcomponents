'use strict';

const unique=require('../lib/utils/uniqueEntries.js');

const eventNames={
    //global reset
    RESET:'global.store.reset',

    //login
    NEW_LOGIN_ERROR:'login.error.new',
    NEW_LOGIN_RESPONSE:'login.response.recieved',

    //global errors
    GLOBAL_ERROR_NEW:'GlobalError.new',
    GLOBAL_ERROR_EXPIRED:'GlobalError.expired',

    //global modal
    GLOBAL_MODAL_NEW:'GlobalModal.new',

    //user Input
    UPDATED_USER_INPUT:'updated.userInput',
    READ_DROPPED_FILE:'read.dropped.file',

    //login
    NEW_LOGIN_ERROR:'login.error.new',
    NEW_LOGIN_RESPONSE:'login.response.recieved',

    //router
    ROUTER_SCREEN_CHANGE:'router.screen.changed',
    ROUTER_HISTORY_NAVIGATE:'router.history.navigate',
    ROUTER_SCREEN_LIST:'router.got.screens',
};

unique(eventNames);

module.exports=eventNames;
