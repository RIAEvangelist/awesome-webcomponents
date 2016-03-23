'use strict';

(
    function(){

        class Store{
            constructor(){
                const store=new awesome.Store;
                const dispatcher=awesome.dispatchers.store;
                const constants=awesome.constants.store;

                store.expose(this,'boilerplate');

                /*********************************\
                Set your default store state here
                \*********************************/

                store.defaultState={
                    boilerplate:true
                };

                store.resetState();

                dispatcher.on(
                    constants.BOILERPLATE,
                    handleBoilerplate
                );

                function handleBoilerplate(){
                    store.state={
                        //ternary just toggles true false when event recieved
                        boilerplate:(store.state)? false:true
                    };
                }
            }
        }

        new Store;
    }
)();
