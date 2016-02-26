'use strict';

awesome.constants.store={
    /**
     * all stores should reset their state
     * @member awesome.constants.store.RESET
     * @type {EventName}
     */
    RESET:'global.store.reset',

    /**
     * user supplied bad credentials
     * @member awesome.constants.store.LOGIN_ERROR
     * @type {EventName}
     */
    LOGIN_ERROR:'login.error',
    /**
     * there was an error logging out
     * @member awesome.constants.store.LOGOUT_ERROR
     * @type {EventName}
     */
    LOGOUT_ERROR:'logout.error',
    /**
     * login was successful
     * @member awesome.constants.store.LOGIN_SUCCESS
     * @type {EventName}
     */
    LOGIN_SUCCESS:'login.success',
    /**
     * logout was successful
     * @member awesome.constants.store.LOGOUT_SUCCESS
     * @type {EventName}
     */
    LOGOUT_SUCCESS:'logout.success',

    /**
     * file list available
     * @type {String}
     */
    FILE_LIST:'file.list'
};
