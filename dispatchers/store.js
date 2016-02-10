'use strict';

awesome.requireScript(`${awesome.path}bower_components/event-pubsub/event-pubsub-browser.js`);

(
    function(){
        const events=new pubsub;

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
