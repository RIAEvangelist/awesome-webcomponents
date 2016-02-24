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
             *
             * @example
             *
             * //trigger an event to store
             * awesome.dispatchers.action.trigger(
             *  	awesome.constants.store.YOUR_STORE_CONSTANT,
             *  	{
             *  		data1 : 'data1',
             *  		data2 : 'data2'
             *  	}
             * );
             *
             * //listen to an event from a component
             * awesome.dispatchers.action.on(
             *  	awesome.constants.components.YOUR_COMPONENT_CONSTANT,
             *  	yourHanderFunction
             * );
             *
             * //stop listening to the event
             *  awesome.dispatchers.action.off(
             *  	awesome.constants.components.YOUR_COMPONENT_CONSTANT,
             *  	yourHanderFunction
             * );
             *
             *
             * @member awesome.dispatchers.action
             * @type {EventEmitter}
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
