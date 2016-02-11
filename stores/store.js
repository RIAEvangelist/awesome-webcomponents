'use strict';

awesome.requireScript(`${awesome.path}dispatchers/store.js`);
awesome.requireScript(`${awesome.path}stores/constants.js`);
awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);
awesome.requireScript(`${awesome.bower}js-message/js-message-vanilla.js`);


(
    function(){

        class Store{
            constructor(){
                const events=new pubsub;

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
                        expose:{
                            enumerable:true,
                            writable:false,
                            value:expose
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

                awesome.dispatchers.store.on(
                    awesome.constants.store.RESET,
                    this.resetState
                );

                function expose(instance,name){
                    Object.defineProperties(
                        instance,
                        {
                            state:{
                                enumerable:true,
                                get:getState.bind(this),
                                set:getState.bind(this)
                            }
                        }
                    );

                    Object.seal(instance);

                    Object.defineProperty(
                        awesome.stores,
                        name,
                        {
                            enumerable:true,
                            writable:false,
                            value:instance
                        }
                    );
                }

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
        }

        Object.defineProperty(
            awesome,
            'Store',
            {
                enumerable:true,
                writable:false,
                value:Store
            }
        );
    }
)();
