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
            constants.LOGIN_REQUEST,
            login
        );

        dispatcher.on(
            constants.LOGOUT_REQUEST,
            logout
        );

        function login(data){
            // TODO : hookup to basic auth services
            dispatcher.trigger(
                storeEvents.LOGIN_SUCCESS,
                {
                    username:'RIAEvangelist',
                    token:'this is totally bogus'
                }
            );

            //TODO handle pass and fail
            return;

            dispatcher.trigger(
                storeEvents.LOGIN_ERROR,
                data
            );
        }

        function logout(data){
            // TODO : hookup to basic auth services
            dispatcher.trigger(
                storeEvents.LOGOUT_SUCCESS
            );

            //TODO handle pass and fail
            return;

            dispatcher.trigger(
                storeEvents.LOGOUT_ERROR,
                data
            );
        }
    }
)();
