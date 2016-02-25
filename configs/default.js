'use strict';

awesome.config={

    //validators
    validate:{
        username:'[a-zA-Z0-9\\@\\.\\-\\_]{6,30}',
        email:'([a-zA-Z0-9\.\-\_]{1,20})\@([a-zA-Z0-9\.\-\_]{2,50})\.([a-zA-Z]{2,10})',
        url:'^(https?:\/\/)?([\da-z\.-]+)\.(.{2,100})$'
    }
};
