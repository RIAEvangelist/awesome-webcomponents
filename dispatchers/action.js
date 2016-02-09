'use strict';

awesome.requireScript(`${awesome.path}node_modules/event-pubsub/event-pubsub-browser.js`);
awesome.requireScript(`${awesome.path}dispatchers/store.js`);

(
    function(){
        const events=new pubsub;
        const store=awesome.dispatchers.store.events;

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
                        trigger:{
                            enumarable:true,
                            writable:false,
                            value:store.trigger.bind(store)
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
            'action',
            {
                enumerable:true,
                writable:false,
                value:new Dispatcher
            }
        );
    }
)();
