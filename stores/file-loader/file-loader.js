'use strict';

(
    function(){

        class Store{
            constructor(){
                const store=new awesome.Store;
                const dispatcher=awesome.dispatchers.store;
                const constants=awesome.constants.store;

                store.expose(this,'file-loader');

                /*********************************\
                Set your default store state here
                \*********************************/

                store.defaultState={
                    files:{}
                };

                store.resetState();

                /*******************************\
                Put your private store functions
                Here
                \*******************************/

                dispatcher.on(
                    constants.FILE_LIST,
                    receivedFiles
                );

                function receivedFiles(list){
                    store.state ={
                        files:list
                    }
                    console.log(store.state, 'STORE');
                }
            }
        }

        new Store;
    }
)();
