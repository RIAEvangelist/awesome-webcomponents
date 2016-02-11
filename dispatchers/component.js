'use strict';

awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);
awesome.requireScript(`${awesome.path}dispatchers/action.js`);

(
    function(){
        const action=awesome.dispatchers.action.events;

        class Dispatcher{
            constructor(){
                Object.defineProperties(
                    this,
                    {
                        trigger:{
                            enumarable:false,
                            writable:false,
                            value:action.trigger(action)
                        }
                    }
                );
            }
        }

        Object.defineProperty(
            awesome.dispatchers,
            'component',
            {
                enumerable:true,
                writable:false,
                value:new Dispatcher
            }
        );
    }
)();
