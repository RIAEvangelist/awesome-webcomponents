'use strict';

awesome.requireScript(`${awesome.path}stores/constants.js`);

(
    function(){

        class Store{
            constructor(){
                const store=new awesome.Store;
                const dispatcher=awesome.dispatchers.store;
                const constants=awesome.constants.store;

                store.expose(this,'auth');

                /*********************************\
                Set your default store state here
                \*********************************/

                store.defaultState={
                    username:'',
                    token:'',
                    failedAttempts:0,
                    authenticated:false
                };

                store.resetState();

                /*******************************\
                Put your private store functions
                Here
                \*******************************/

                dispatcher.on(
                    constants.NEW_LOGIN_ERROR,
                    loginError
                );

                dispatcher.on(
                    constants.NEW_LOGIN_RESPONSE,
                    loginResponse
                );

                function loginResponse(message){
                    console.log(message.JSON);
                    store.state={
                        authenticated:true,
                        token:message.data.token
                    };
                }

                function loginError(message){
                    store.state={
                        failedAttempts:store.state.failedAttempts++,
                        authenticated:false
                    };
                }
            }
        }

        new Store;
    }
)();
