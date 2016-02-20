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
     * @member awesome.constants.actions.TRIGGER_GLOBAL_MODAL
     * @type {String}
     */
    TRIGGER_GLOBAL_MODAL:'GlobalModal.new',

    /**
     * file dropped into drop field
     * @member aweseome.constants.actions.GENERIC_DRAG_DROP_FILE
     * @type {String}
     */
    GENERIC_DRAG_DROP_FILE:'generic.drag.drop.file',

    /**
     * logout request
     * @memeber awesome.constants.actions.LOGOUT_REQUEST
     * @type {String}
     */
    LOGOUT_REQUEST:'logout.request',
    /**
     * login request
     * @memeber awesome.constants.actions.LOGIN_REQUEST
     * @type {String}
     */
    LOGIN_REQUEST:'login.request',
}
