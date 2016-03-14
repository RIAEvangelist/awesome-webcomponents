'use strict';

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
                    constants.LOGIN_ERROR,
                    loginError
                );

                dispatcher.on(
                    constants.LOGOUT_ERROR,
                    loginError
                );

                dispatcher.on(
                    constants.LOGOUT_SUCCESS,
                    loginError
                );

                dispatcher.on(
                    constants.LOGIN_SUCCESS,
                    loginSuccess
                );

                function loginSuccess(data){
                    store.state={
                        authenticated:true,
                        token:data.token,
                        firstName:data.user.firstName,
                        lastName: data.user.lastName
                    };
                }

                function logoutSuccess(data){
                    store.resetState();
                }

                function logoutError(data){
                    store.resetState();
                }

                function loginError(data){
                    store.state={
                        failedAttempts:store.state.failedAttempts++,
                        authenticated:false,
                        token:''
                    };
                }
            }
        }

        new Store;
    }
)();
