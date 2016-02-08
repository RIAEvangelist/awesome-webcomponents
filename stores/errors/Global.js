var shared=require('../shared.js');

var store=new shared.Store;
module.exports=store.exposedState;

/*********************************\
Set your default store state here
\*********************************/

store.defaultState={
    all:[],
    new:[]
};

store.resetState();

/*******************************\
Put your private store functions
Here
\*******************************/

var expirationInterval=null;

shared.dispatcher.on(
    shared.storeEvents.GLOBAL_ERROR_NEW,
    addNew
);

shared.dispatcher.on(
    shared.storeEvents.GLOBAL_ERROR_EXPIRED,
    expiredError
);

function addNew(message){
    var err={
        type:message.type,
        data:message.data
    }

    err.storeTimestamp=new Date().getTime();

    var state=store.state;
    state.new.push(err);
    state.all.push(err);

    store.state=state;
    if(expirationInterval){
        return;
    }
    expirationInterval=setInterval(
        expireError,
        5000
    );
}

function expiredError(err){
    var state=store.state;
    for(var i in state.new){
        if(err.storeTimestamp==state.new[i].storeTimestamp){
            state.new.splice(i,1);
        }
    }
    if(state.new.length<1){
        clearInterval(expirationInterval);
        expirationInterval=null;
    }
    store.state=state;
}

function expireError(){
    expiredError(store.state.new[0]);
};
