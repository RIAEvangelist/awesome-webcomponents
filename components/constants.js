'use strict';

awesome.constants.component={
    /**
     * pointer leaves drag and drop field
     * @member awesome.constants.component.DRAG_DROP_LEAVE
     * @type {EventName}
     */
    DRAG_DROP_LEAVE:'dragdrop.leave',

    //validators make example for these. the regular expressions ***************
    /**
     * regular expression for validating user name
     *
     * @example
     *
     * 
     *
     * @memeber awesome.constants.component.VALIDATE_USERNAME
     * @type {EventName}
     */
    VALIDATE_USERNAME:'[a-zA-Z0-9\\@\\.\\-\\_]{6,30}',
    /**
     * regular expression for validating user email
     * @memeber awesome.constansts.component.VALIDATE_EMAIL
     * @type {EventName}
     */
    VALIDATE_EMAIL:'([a-zA-Z0-9\.\-\_]{1,20})\@([a-zA-Z0-9\.\-\_]{2,50})\.([a-zA-Z]{2,10})',
    /**
     * regular expression for validating url
     * @memeber awesome.constansts.component.VALIDATE_URL
     * @type {EventName}
     */
    VALIDATE_URL:'^(https?:\/\/)?([\da-z\.-]+)\.(.{2,100})$'
};
