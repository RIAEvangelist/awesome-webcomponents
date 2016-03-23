'use strict';

awesome.requireCSS(`${awesome.path}components/_a_boilerplate/awesome-boilerplate.css`);
awesome.requireCSS(`${awesome.path}stores/_a_boilerplate/boilerplate.js`);

(
    function(){
        let store=null;
        let dispatcher=null;
        let constants = null;
        let action = null;
        const defaults={
            something:'Boilerplate'
        }


        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            dispatcher=awesome.dispatchers.component;
            constants=awesome.constants.component;
            action=awesome.constants.action;

            store=awesome.store.boilerplate;

            document.registerElement(
                'awesome-boilerplate-advanced',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <p>${this.dataset.something}</p>
                    <p>
                        store.state.boilerplate =
                        <span class='awesome-boilerplate-state'>
                            ${store.state.boilerplate}
                        </span>
                    <div>${content}</div>

                    <!-- preserve content template so it isn't lost on re-render -->
                    ${content.template}
                `;
            }

            attachedCallback(){
                this.store.on(
                    'change',
                    update
                )
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){

            }

            update(){
                //do something with store.state values here
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
