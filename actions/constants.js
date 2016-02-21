'use strict';

awesome.constants.action={
    /**
     * all stores should reset their state
     * @member awesome.constants.action.RESET_STORES
     * @type {EventName}
     */
    RESET_STORES:'app.reset.all.stores',

    /**
     * triggere global modal
     * @member awesome.constants.action.TRIGGER_GLOBAL_MODAL
     * @type {EventName}
     */
    TRIGGER_GLOBAL_MODAL:'GlobalModal.new',

    /**
     * file dropped into drop field
     * @member awesome.constants.action.GENERIC_DRAG_DROP_FILE
     * @type {EventName}
     */
    GENERIC_DRAG_DROP_FILE:'generic.drag.drop.file',

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
}
