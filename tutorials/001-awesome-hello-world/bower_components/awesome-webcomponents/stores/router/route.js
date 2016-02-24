'use strict';

(
    function(){

        class Store{
            constructor(){
                const store=new awesome.Store;
                const dispatcher=awesome.dispatchers.store;
                const constants=awesome.constants.store;

                store.expose(this,'navigation');

                /*********************************\
                Set your default store state here
                \*********************************/

                store.defaultState={
                    screens:[],
                    screen:'login'
                };

                store.resetState();
                store.ignoreResetEvent=true;

                /*******************************\
                Put your private store functions
                Here
                \*******************************/

                dispatcher.on(
                    constants.ROUTER_SCREEN_CHANGE,
                    handleScreenChange
                );

                dispatcher.on(
                    constants.ROUTER_SCREEN_LIST,
                    updateScreens
                );

                function updateScreens(screens){
                    store.state={
                        screens : Object.assign([],screens)
                    };
                }

                function handleScreenChange(data){
                    var screen=data.screen||store.screen;
                    console.log(screen);

                    if(
                        store.state.screen!==screen
                        && !data.isPop
                        && (history.state)
                    ){
                        history.pushState(
                            {
                                screen:screen
                            },
                            screen,
                            '#/'+screen
                        );
                    }

                    if(data.nextScreen){
                        history.replaceState(
                            {
                                nextScreen:data.nextScreen||null,
                                screen:screen
                            },
                            screen,
                            '#/'+screen
                        );
                    }

                    store.state={
                        screen : screen,
                        nextScreen:data.nextScreen
                    };
                }
            }
        }

        new Store;
    }
)();
