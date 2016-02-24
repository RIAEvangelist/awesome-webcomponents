'use strict';

awesome.constants.component={
    //Drag and drop related
    DRAG_DROP_ENTER:'dragdrop.enter',
    DRAG_DROP_OVER:'dragdrop.over',
    DRAG_DROP_LEAVE:'dragdrop.leave',

    //validators
    VALIDATE_USERNAME:'[a-zA-Z0-9\\@\\.\\-\\_]{6,30}',
    VALIDATE_EMAIL:'([a-zA-Z0-9\.\-\_]{1,20})\@([a-zA-Z0-9\.\-\_]{2,50})\.([a-zA-Z]{2,10})',
    VALIDATE_URL:'^(https?:\/\/)?([\da-z\.-]+)\.(.{2,100})$'
};
