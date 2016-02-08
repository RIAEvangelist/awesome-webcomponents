var shared=require('../shared.js');


shared.dispatcher.on(
    shared.actions.ROUTE_REQUEST_CHANGE,
    handleChangeRequest
);

shared.dispatcher.on(
    shared.actions.ROUTE_REQUEST_SCREENS,
    getScreens
);

addEventListener(
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

    shared.dispatcher.trigger(
        shared.storeEvents.ROUTER_SCREEN_LIST,
        screens
    );
}

function handleChangeRequest(data){
    shared.dispatcher.trigger(
        shared.storeEvents.ROUTER_SCREEN_CHANGE,
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


/****************************************\
    shared.actions are not really modules
    we just export them as modules to be
    required in the shared.actions.js which is
    included in the app.js file to init
    all of the required shared.actions.

    all communication is done via a
    shared.dispatcher.
\****************************************/
module.exports=true;
