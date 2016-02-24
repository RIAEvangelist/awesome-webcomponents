'use strict';

awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);
awesome.requireScript(`${awesome.path}dispatchers/action.js`);

(
    function(){
        let action=null;

        function init(e){
            if(e && e.detail!==`${awesome.path}dispatchers/action.js`){
                return;
            }

            window.off(
                'awesome-script-loaded',
                init
            );

            action=awesome.dispatchers.action.events;

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

        class Dispatcher{
            constructor(){
                Object.defineProperties(
                    this,
                    {
                        trigger:{
                            enumarable:false,
                            writable:false,
                            value:action.trigger.bind(action)
                        }
                    }
                );
            }
        }

        if(!awesome.dispatchers.action){
            window.on(
                'awesome-script-loaded',
                init
            )
            return;
        }

        init();

    }
)();
