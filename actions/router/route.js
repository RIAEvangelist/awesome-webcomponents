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
            constants.ROUTE_REQUEST,
            handleChangeRequest
        );

        dispatcher.on(
            constants.ROUTE_UPDATE_SCREENS,
            getScreens
        );

        window.on(
            'popstate',
            handlePopstate
        );


        function getScreens(){
            var screenList=document.querySelectorAll('[data-screen]');
            dispatcher.trigger(
                storeEvents.ROUTER_SCREEN_LIST,
                screenList
            );
        }

        function handleChangeRequest(req){
            let data=req;
            if(typeof req==='string'){
                const screenName=req;
                const startScreen=document.querySelector('body').dataset.start_screen;
                let screen=null;

                if(screenName){
                    screen=document.querySelector(`[data-screen=${screenName}`);
                }

                if(!screen){
                    screen=document.querySelector(
                        `[data-screen=${startScreen}]`
                    );
                }

                data={
                    screen:screen
                };
            }

            dispatcher.trigger(
                storeEvents.ROUTER_SCREEN_CHANGE,
                data
            );
        }

        function handlePopstate(e){
            const screenName=location.hash.slice(2);
            const startScreen=document.querySelector('body').dataset.start_screen;
            let screen=null;

            if(screenName){
                screen=document.querySelector(`[data-screen=${screenName}]`);
            }

            if(!screen){
                screen=document.querySelector(
                    `[data-screen=${startScreen}`
                );
            }

            const data={
                screen:screen
            };
            data.pop=true;

            handleChangeRequest(data);
        }
    }
)();
