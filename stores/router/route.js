'use strict';

(
    function(){

        class Store{
            constructor(){
                const store=new awesome.Store;
                const dispatcher=awesome.dispatchers.store;
                const constants=awesome.constants.store;

                store.expose(this,'route');

                /*********************************\
                Set your default store state here
                \*********************************/

                store.defaultState={
                    screens:[],
                    screen:''
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
                        screens : screens
                    };
                }

                function handleScreenChange(data){
                    const screen=data.screen||store.screen;

                    if(!screen){
                        //TODO maybe throw an error?
                        return;
                    }

                    const screenName=screen.dataset.screen;

                    if(store.state.screen===screenName){
                        return;
                    }

                    document.location.hash=`/${screenName}`;

                    if(
                        !data.isPop
                        && (history.state)
                    ){
                        history.pushState(
                            {
                                screen:screenName
                            },
                            screenName,
                            '#/'+screenName
                        );
                    }

                    if(data.nextScreen){
                        history.replaceState(
                            {
                                nextScreen:data.nextScreen.dataset.screen,
                                screen:screenName
                            },
                            screenName,
                            '#/'+screenName
                        );
                    }

                    store.state={
                        screen : screenName,
                        nextScreen:data.nextScreen
                    };

                    for(let i=0; i<store.state.screens.length;i++){
                        const screenEl=store.state.screens[i];
                        if(screenEl.dataset.screen!==store.state.screen){
                            screenEl.classList.remove('activeScreen');
                            continue;
                        }
                        screenEl.classList.add('activeScreen');
                    }
                }
            }
        }

        new Store;
    }
)();
