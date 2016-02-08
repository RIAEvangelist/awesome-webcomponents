var shared=require('../shared.js');

var store=new shared.Store;
module.exports=store.exposedState;

/*********************************\
Set your default store state here
\*********************************/

store.defaultState={
    isModalOn:false,
    type:'',
    title:'',
    content:''
};

store.resetState();

/*******************************\
Put your private store functions
Here
\*******************************/


shared.dispatcher.on(
    shared.storeEvents.GLOBAL_MODAL_NEW,
    addNewModal
);

function addNewModal(message){
    store.state = {
        isModalOn:(store.state.isModalOn) ? false:true,
        type: message.type,
        title: message.title,
        content: message.content
    };
}
