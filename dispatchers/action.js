'use strict';
awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);
awesome.requireScript(`${awesome.path}dispatchers/store.js`);

(
    function(){
        const events=new pubsub;
        let store=null;

        function init(e){
            if(e && e.detail!==`${awesome.path}dispatchers/store.js`){
                return;
            }

            window.off(
                'awesome-script-loaded',
                init
            );

            store=awesome.dispatchers.store.events;

            /**
             * awesome dispatcher for actions, uses event-pubsub
             * @member awesome.dispatchers.action
             * @type {Events}
             * @prop on {Function} binds handler to action event
             * @prop off {Function} ***un***binds handler from action event
             * @prop trigger {Function} fires store event
             */
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

        if(!awesome.dispatchers.store){
            window.on(
                'awesome-script-loaded',
                init
            )
            return;
        }

        init();
    }
)();
