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
            constants.BOILERPLATE,
            handleBoilerplate
        );


        function handleBoilerplate(){
            dispatcher.trigger(
                storeEvents.BOILERPLATE,
                null
            );
        }
    }
)();
