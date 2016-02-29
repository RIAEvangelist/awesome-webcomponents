'use strict';

awesome.constants.action={
    /**
     * all stores should reset their state
     * @member awesome.constants.action.RESET_STORES
     * @type {EventName}
     */
    RESET_STORES:'app.reset.all.stores',

    /**
     * files loaded and available
     * @member awesome.constants.action.FILE_LOADED
     * @type {String}
     */
    FILE_LOADED:'file.loaded',

    /**
     * logout request
     * @memeber awesome.constants.action.LOGOUT_REQUEST
     * @type {EventName}
     */
    LOGOUT_REQUEST:'logout.request',
    /**
     * login request
     * @memeber awesome.constants.action.LOGIN_REQUEST
     * @type {EventName}
     */
    LOGIN_REQUEST:'login.request',

    ROUTE_REQUEST:'router.navigate',

    ROUTE_UPDATE_SCREENS:'router.find.screens'
}
