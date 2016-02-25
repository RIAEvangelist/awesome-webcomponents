'use strict';

awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);

(
    function(){
        const events=new pubsub;

        /**
         * awesome dispatcher for stores, uses event-pubsub
         *
         * @example
         *
         * const dispatcher = awesome.dispatcher.store;
         * const constants = awesome.constants;
         *
         * //listen to an event from an action
         * dispatcher.on(
         *  	constants.action.YOUR_STORE_CONSTANT,
         *  	yourHanderFunction
         * );
         *
         * //stop listening to the event
         *  dispatcher.off(
         *  	constants.components.YOUR_STORE_CONSTANT,
         *  	yourHanderFunction
         * );
         *
         * @member awesome.dispatchers.store
         * @type {EventEmitter}
         * @prop on {Function} binds handler to store events
         * @prop off {Function} ***un***binds handler from store event
         * @prop events {Function} fires event
         */
        class Dispatcher{
            constructor(){
                Object.defineProperties(
                    this,
                    {
                        on:{
                            enumarable:true,
                            writable:false,
                            value:events.on.bind(events)
                        },
                        off:{
                            enumarable:true,
                            writable:false,
                            value:events.off.bind(events)
                        },
                        events:{
                            enumarable:false,
                            writable:false,
                            value:events
                        }
                    }
                );
            }
        }

        Object.defineProperty(
            awesome.dispatchers,
            'store',
            {
                enumerable:true,
                writable:false,
                value:new Dispatcher
            }
        );
    }
)();
