var shared=require('../shared.js');

var constants=require('../../components/constants.js');

var store=new shared.Store;
module.exports=store.exposedState;

/*********************************\
Set your default store state here
\*********************************/

store.defaultState={
    dragEnter:null,
    dragOver:null,
    dragLeave:null,
    drop:null,
    list:[]
};

store.resetState();

/*******************************\
Put your private store functions
Here
\*******************************/

shared.dispatcher.on(
    shared.storeEvents.READ_DROPPED_FILE,
    dropFileReceived
);

function dropFileReceived(message){
    if(message.type!==constants.GENERIC_DRAG_DROP_FILE){
        return;
    }

    switch(message.type){
        case constants.GENERIC_DRAG_DROP_FILE :
            var state=store.state;
            state.drop = message.data;
            var foundFile = false;
            for(var i = 0; i<state.list.length;i++){
                if(state.list[i].file.name != state.drop.file.name){
                    continue;
                }
                state.list[i] = state.drop;
                foundFile = true;
                break;
            }
            if(!foundFile){
                state.list.push(state.drop);
            }
            store.state=state;
            break;
    }
}
