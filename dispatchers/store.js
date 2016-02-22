'use strict';

awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);

(
    function(){
        const events=new pubsub;

        /**
         * awesome dispatcher for stores, uses event-pubsub
         * @member awesome.dispatchers.store
         * @type {EventEmitter}
         * @prop on {Function} binds handler to event
         * @prop off {Function} ***un***binds handler from event
         * @prop trigger {Function} fires event
         */
        Object.defineProperty(
            awesome.dispatchers,
            'store',
            {
                enumerable:true,
                writable:false,
                value:new Dispatcher
            }
        );

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
    }
)();
