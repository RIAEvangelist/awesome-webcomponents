var Events=require('event-pubsub');
var storeEvents=new Events;
var actionEvents=new Events;

//ONLY FOR USE BY STORES
function StoreDispatcher (){
    Object.defineProperties(
        this,
        {
            //LISTEN FOR STORE EVENTS
            on:{
                enumarable:true,
                writable:false,
                value:storeEvents.on.bind(storeEvents)
            },
            off:{
                enumarable:true,
                writable:false,
                value:storeEvents.off.bind(storeEvents)
            }
        }
    );
}

//ONLY FOR USE BY ACTIONS
function ActionDispatcher(){
    Object.defineProperties(
        this,
        {
            //LISTEN FOR ACTION EVENTS
            on:{
                enumarable:true,
                writable:false,
                value:actionEvents.on.bind(actionEvents)
            },
            off:{
                enumarable:true,
                writable:false,
                value:actionEvents.off.bind(actionEvents)
            },

            //TRIGGER EVENTS ON STORES
            trigger:{
                enumarable:true,
                writable:false,
                value:storeEvents.trigger.bind(storeEvents)
            }
        }
    );
}

//ONLY FOR USE BY COMPONENTS
function ComponentDispatcher (){
    Object.defineProperties(
        this,
        {
            //TRIGGER EVENTS ON ACTIONS
            trigger:{
                enumarable:true,
                writable:false,
                value:actionEvents.trigger.bind(actionEvents)
            }
        }
    );
}

var store=new StoreDispatcher;
var action=new ActionDispatcher;
var component=new ComponentDispatcher;

module.exports.StoreDispatcher      = store;
module.exports.ActionDispatcher     = action;
module.exports.ComponentDispatcher  = component;
