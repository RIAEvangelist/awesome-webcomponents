'use strict';

awesome.requireScript(`${awesome.path}dispatchers/action.js`);
awesome.requireScript(`${awesome.path}actions/constants.js`);
awesome.requireScript(`${awesome.path}stores/constants.js`);


(
    function(){
        const dispatcher=awesome.dispatchers.action;
        const constants=awesome.constants.action;
        const storeEvents=awesome.constants.store;

        dispatcher.on(
            constants.USER_INPUT_FILE_LOADED,
            fileLoaded
        );


        /**
         * [fileLoaded description]
         * @param  {[object]} message returns object of files loaded
         * @return {[void]}     Message objects in console
         */
        function fileLoaded(message){
            console.log('Action received this message: ', message);
        }
    }
)();
