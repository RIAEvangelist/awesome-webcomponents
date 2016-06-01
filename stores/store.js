'use strict';

awesome.requireScript(`${awesome.path}dispatchers/store.js`);
awesome.requireScript(`${awesome.path}stores/constants.js`);
awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);
awesome.requireScript(`${awesome.bower}js-message/js-message-vanilla.js`);


(
    function(){

        /**
         * @class awesome.Store
         *
         * @prop state {Object} state data of store exposed for reading by components via expose. The store modifies this as a shallow merge Object.
         * @prop defaultState {Object} default store state
         * @prop ignoreResetEvent {Boolean} flag to ignore the global reset event ***USE WITH CAUTION***
         * @prop resetState {Function} rests the store state
         * @prop expose {Function} registers the read-only state with awesome.stores[store name] for components to use
         */
        class Store{
            constructor(){
                const events=new pubsub;

                Object.defineProperties(
                    this,
                    {
                        /**
                         * state data of store exposed for reading by components via expose. The store modifies this as a shallow merge Object.
                         *
                         * @example
                         *
                         * //set the store state with a shallow merge
                         *  myStoreState = {
                         *   	property: 'prop'
                         *  }
                         *  store.state = myStoreState;
                         *
                         * //get the store state
                         *  const state = store.state
                         *
                         * @member awesome.Store.state
                         * @protected
                         * @type {Object}
                         */
                        state:{
                            enumarable:true,
                            get:getState,
                            set:setState
                        },
                        /**
                         * default store state
                         *
                         * @example
                         *
                         * //set your default store
                         * store.defaultState = {
                         *  	defaultProperty1: 'red',
                         *  	defaultProperty2: 'white',
                         *  	defaultPropertyN: 'mandalorian'
                         * }
                         *
                         * @member awesome.Store.defaultState
                         * @type {Object}
                         */
                        defaultState:{
                            enumarable:true,
                            writable:true,
                            value:{}
                        },
                        /**
                         * flag to ignore the global reset event ***USE WITH CAUTION***
                         *
                         * @example
                         *
                         * //ignore the global reset event
                         *  store.ignoreResetEvent = true;
                         *
                         * @member awesome.Store.ignoreResetEvent
                         * @type {Boolean}
                         */
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
                        /**
                         * you do not see the man behind the curtain!! IGNORE THIS!!
                         * @member awesome.Store._raw_state_dont_touch_
                         * @private
                         * @type {Object}
                         */
                        _raw_state_dont_touch_:{
                            enumarable:false,
                            writable:true,
                            value:{}
                        }
                    }
                );

                Object.defineProperties(
                    this._raw_state_dont_touch_,
                    {
                        on:{
                            enumarable:false,
                            writable:false,
                            value:events.on.bind(events)
                        },
                        off:{
                            enumarable:false,
                            writable:false,
                            value:events.on.bind(events)
                        }
                    }
                );

                awesome.dispatchers.store.on(
                    awesome.constants.store.RESET,
                    this.resetState
                );

                /**
                 * registers the read-only state with awesome.stores[store name] for components to use
                 *
                 * @example
                 *
                 * //expose your store
                 * store.expose(yourStoreScope, 'yourStoreName');
                 *
                 * @method awesome.Store.expose
                 * @param  {Store} instance your instantiated Store instance
                 * @param  {String} name     The name of your store
                 */
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
                 * rests the store state
                 *
                 * @example
                 * //reset the store state
                 * store.resetState();
                 *
                 * @method awesome.Store.resetState
                 * @param  {Object}   events your stores event-pubsub instance
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
                 * @fires awesome.store.change
                 */
                function setState(newState){
                    Object.assign(this._raw_state_dont_touch_,newState);

                    /**
                     * Store.state change event used to notify component that the store state has changed.
                     * @event awesome.Store.change
                     */
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
