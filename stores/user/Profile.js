var shared=require('../shared.js');

var state=null;

shared.dispatcher.on(
    shared.storeEvents.RESET,
    resetState
);

function resetState(){
    state=Object.assign({},defaultState);
}

var defaultState={};


/*******************************\
Put your private store functions
Here
\*******************************/









/******************************\
You should not need to update
the Store Class.
\******************************/
resetState();
function Store(){
    Object.defineProperties(
        this,
        {
            state:{
                enumarable:true,
                get:getState,
                set:getState
            }
        }
    );

    function getState(){
        return state;
    }
}

module.exports=Store;
