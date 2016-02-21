'use strict';

awesome.constants.component={
    //Drag and drop related
    /**
     * pointer enters drag and drop field
     * @member awesome.constants.component.DRAG_DROP_ENTER
     * @type {String}
     */
    DRAG_DROP_ENTER:'dragdrop.enter',
    /**
     * pointer over drag and drop field
     * @memeber awesome.constants.component.DRAG_DROP_OVER
     * @type {String}
     */
    DRAG_DROP_OVER:'dragdrop.over',
    /**
     * pointer leaves drag and drop field
     * @member awesome.constants.component.DRAG_DROP_LEAVE
     * @type {String}
     */
    DRAG_DROP_LEAVE:'dragdrop.leave',

    //validators
    /**
     * regular expression for validating user name
     * @memeber awesome.constants.component.VALIDATE_USERNAME
     * @type {String}
     */
    VALIDATE_USERNAME:'[a-zA-Z0-9\\@\\.\\-\\_]{6,30}',
    /**
     * regular expression for validating user email
     * @memeber awesome.constansts.component.VALIDATE_EMAIL
     * @type {String}
     */
    VALIDATE_EMAIL:'([a-zA-Z0-9\.\-\_]{1,20})\@([a-zA-Z0-9\.\-\_]{2,50})\.([a-zA-Z]{2,10})',
    /**
     * regular expression for validating url
     * @memeber awesome.constansts.component.VALIDATE_URL
     * @type {String}
     */
    VALIDATE_URL:'^(https?:\/\/)?([\da-z\.-]+)\.(.{2,100})$'
};
