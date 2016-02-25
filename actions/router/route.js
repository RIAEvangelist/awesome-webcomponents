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

        shared.dispatcher.on(
            constants.ROUTE_UPDATE_SCREENS,
            getScreens
        );

        window.on(
            'popstate',
            handlePopstate
        );


        function getScreens(){
            var screenList=document.querySelectorAll('[data-screen]');
            var screens=[];
            for(var i=0; i<screenList.length; i++){
                screens.push(
                    Object.assign(
                        {},
                        screenList[i].dataset
                    )
                );
            }

            dispatcher.trigger(
                storeEvents.ROUTER_SCREEN_LIST,
                screens
            );
        }

        function handleChangeRequest(data){
            dispatcher.trigger(
                storeEvents.ROUTER_SCREEN_CHANGE,
                data
            );
        }

        function handlePopstate(e){
            var screen=location.hash.slice(2)||this.props.startScreen;
            var data={
                screen:screen
            };
            data.pop=true;
            
            handleChangeRequest(data);

        }
    }
)();
