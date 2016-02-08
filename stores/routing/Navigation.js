var shared=require('../shared.js');

var store=new shared.Store;
module.exports=store.exposedState;

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

shared.dispatcher.on(
    shared.storeEvents.ROUTER_SCREEN_CHANGE,
    handleScreenChange
);

shared.dispatcher.on(
    shared.storeEvents.ROUTER_SCREEN_LIST,
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
        console.log('replacing with next screen',screen,data.nextScreen);
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
