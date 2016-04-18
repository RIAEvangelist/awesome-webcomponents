'use strict';

awesome.requireCSS(`${awesome.path}components/grid/awesome-data-grid.css`);
// awesome.requireCSS(`${awesome.path}stores/_a_boilerplate/boilerplate.js`);

(
    function(){
        let store=null;
        let dispatcher=null;
        let constants = null;
        let action = null;
        const defaults={};


        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            dispatcher=awesome.dispatchers.component;
            constants=awesome.constants.component;
            action=awesome.constants.action;

            // store=awesome.store.boilerplate;

            document.registerElement(
                'awesome-data-grid',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                `;
            }

            attachedCallback(){
                this.store.on(
                    'change',
                    update.bind(this)
                )
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                //just re-render for this simple example
                this.createdCallback();
            }

            update(){
                //just re render this simple example
                this.createdCallback();
            }
        }

        if(!awesome.ready){
            window.on(
                'awesome-ready',
                init
            );

            return;
        }

        init();
    }
)();
