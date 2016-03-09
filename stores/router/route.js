'use strict';

awesome.requireScript(`${awesome.path}stores/user/auth.js`);

(
    function(){

        class Store{
            constructor(){
                const store=new awesome.Store;
                const dispatcher=awesome.dispatchers.store;
                const constants=awesome.constants.store;
                let auth=null;

                // if(location.protocol==='file:'){
                //     history.replaceState=localReplaceState;
                // }
                //
                // function localReplaceState(state,screenName,path){
                //     history.pushState(
                //         state,
                //         screenName,
                //         path
                //     );
                // }

                window.on(
                    'awesome-ready',
                    initAuth
                );

                function initAuth(){
                    window.off(
                        'awesome-ready',
                        initAuth
                    );

                    if(!awesome.requiresAuth){
                        return;
                    }

                    auth=awesome.stores.auth.state;

                    auth.on(
                        'change',
                        handleAuthChange
                    )
                }

                store.expose(this,'route');

                /*********************************\
                Set your default store state here
                \*********************************/

                store.defaultState={
                    screens:[],
                    screen:'',
                    nextScreen:false
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

                function handleAuthChange(){
                    if(!auth.authenticated){
                        handleScreenChange(
                            {}
                        );
                        return;
                    }

                    handleScreenChange(
                        {
                            screen:{
                                dataset:{
                                    screen:store.state.nextScreen
                                }
                            }
                        }
                    );
                }

                function handleScreenChange(data){
                    const screen=data.screen
                        ||{
                            dataset:{
                                screen:store.state.screen
                            }
                        };

                    if(!screen){
                        //TODO maybe throw an error?
                        return;
                    }

                    let screenName=screen.dataset.screen;

                    if(auth && !auth.authenticated){
                        store.state.nextScreen=store.state.nextScreen
                            ||screen.dataset.screen;
                        screenName='login';
                    }else{
                        store.state.nextScreen=false;
                    }

                    if(store.state.screen===screenName){
                        return;
                    }

                    document.location.hash=`/${screenName}`;

                    //TODO : handle if Chrome and file: <- chrome chokes with that
                    // if(
                    //     !data.isPop
                    //     && (history.state)
                    // ){
                    //     history.pushState(
                    //         {
                    //             screen:screenName
                    //         },
                    //         screenName,
                    //         '#/'+screenName
                    //     );
                    // }

                    // if(data.nextScreen){
                    //     history.replaceState(
                    //         {
                    //             nextScreen:data.nextScreen.dataset.screen,
                    //             screen:screenName
                    //         },
                    //         screenName,
                    //         '#/'+screenName
                    //     );
                    // }

                    store.state={
                        screen : screenName
                    };

                    //TODO if more than one screen has the same data-screen throw an error
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
