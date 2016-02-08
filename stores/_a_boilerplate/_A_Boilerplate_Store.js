var shared=require('../shared.js');

var store=new shared.Store;
module.exports=store.exposedState;

/*********************************\
Set your default store state here
\*********************************/

store.defaultState={};

store.resetState();

/*******************************\
Put your private store functions
Here
\*******************************/
