var shared=require('../shared.js');

var constants=require('../../components/constants.js');
var validUsername=require('../../lib/validators/username.js');

var store=new shared.Store;
module.exports=store.exposedState;

/*********************************\
Set your default store state here
\*********************************/

store.defaultState={
    username:'',
    validUsername:false,
    token:'',
    failedAttempts:0,
    authenticated:false
};

store.resetState();

/*******************************\
Put your private store functions
Here
\*******************************/

shared.dispatcher.on(
    shared.storeEvents.UPDATED_USER_INPUT,
    updateCreds
);

shared.dispatcher.on(
    shared.storeEvents.NEW_LOGIN_ERROR,
    loginError
);

shared.dispatcher.on(
    shared.storeEvents.NEW_LOGIN_RESPONSE,
    loginResponse
);

function loginResponse(message){
    console.log(message.JSON);
    store.state={
        authenticated:true,
        token:message.data.token
    };
}

function handleErrorResponse(response){
    console.warn('IDK... but you couldn\'t login');
}

function updateCreds(message){
    if(message.type!==constants.LOGIN_USERNAME){
        return;
    }
    switch(message.type){
    case constants.LOGIN_USERNAME :
        store.state={
                username:message.data.value,
                validUsername:validUsername(
                    message.data.value
                )
            };
        break;
    }
}

function loginError(message){
    store.state={
        failedAttempts:store.state.failedAttempts++
    };
}
