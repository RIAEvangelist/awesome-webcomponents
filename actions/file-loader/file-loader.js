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
            constants.FILE_LOADED,
            fileLoaded
        );


        /**
         * Takes in file/files list object and dispatches to store
         * @param  {Object} list contains files
         * @return {Void}
         */
        function fileLoaded(list){
            console.log('Action received this message: ', list);
            const files = {};
            files[list.id] = list;

            dispatcher.trigger(
                storeEvents.FILE_LIST,
                files
            );
        }
    }
)();
