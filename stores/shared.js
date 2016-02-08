'use strict';

const Message=require('js-message');
const dispatcher=require('../dispatchers/default.js').StoreDispatcher;
const storeEvents=require('./constants.js');
const Events=require('event-pubsub');

function Store(){
    const events=new Events;

    Object.defineProperties(
        this,
        {
            state:{
                enumarable:true,
                get:getState,
                set:setState
            },
            defaultState:{
                enumarable:true,
                writable:true,
                value:{}
            },
            ignoreResetEvent:{
                enumarable:true,
                writable:true,
                value:false
            },
            resetState:{
                enumarable:true,
                writable:false,
                value:resetState.bind(this,events)
            },
            exposedState:{
                enumarable:true,
                get:getState.bind(this),
                set:getState
            },
            _raw_state_dont_touch_:{
                enumarable:false,
                writable:true,
                value:{
                    on:events.on.bind(events),
                    off:events.on.bind(events)
                }
            }
        }
    );

    dispatcher.on(
        storeEvents.RESET,
        resetState.bind(this,events)
    );

    /**
     * Resets the Stores state value to the defaultState value
     */
    function resetState(events){
        if(this.ignoreResetEvent){
            return;
        }
        Object.assign(
            this._raw_state_dont_touch_,
            this.defaultState
        );
        events.trigger('change');
    }

    /**
     * Returns state value
     * @return {Object} State
     */
    function getState(){
        return this._raw_state_dont_touch_;
    }

    /**
     * Set Store State
     * @param {Object} newState object to be merged into existing state
     */
    function setState(newState){
        Object.assign(this._raw_state_dont_touch_,newState);
        events.trigger('change');
    }
}

exports.storeEvents=storeEvents;
exports.Message=Message;
exports.dispatcher=dispatcher;
exports.Store=Store;
